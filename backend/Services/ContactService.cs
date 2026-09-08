using System.Text;
using System.Text.Json;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using PortfolioAPI.DTOs;

namespace PortfolioAPI.Services;

public interface IContactService
{
    Task<string> SubmitAsync(CreateContactDto dto, string? ipAddress, CancellationToken ct = default);
}

public sealed class ContactService : IContactService
{
    private readonly IWebHostEnvironment _environment;
    private readonly IConfiguration _configuration;
    private readonly ILogger<ContactService> _logger;
    private static readonly SemaphoreSlim FileLock = new(1, 1);
    private static readonly JsonSerializerOptions JsonOptions = new() { WriteIndented = true };

    public ContactService(
        IWebHostEnvironment environment,
        IConfiguration configuration,
        ILogger<ContactService> logger)
    {
        _environment = environment;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<string> SubmitAsync(
        CreateContactDto dto,
        string? ipAddress,
        CancellationToken ct = default)
    {
        var submission = new
        {
            id = Guid.NewGuid().ToString("N"),
            receivedAt = DateTimeOffset.UtcNow,
            ipAddress,
            dto.Name,
            dto.Email,
            dto.Company,
            dto.ProjectType,
            dto.Budget,
            dto.Timeline,
            dto.Message,
        };

        await PersistAsync(submission, ct);
        await TrySendEmailAsync(dto, submission.id, ct);

        _logger.LogInformation("Contact submission {Id} stored from {Email}", submission.id, dto.Email);
        return submission.id;
    }

    private async Task PersistAsync(object submission, CancellationToken ct)
    {
        var storageDir = Path.Combine(_environment.ContentRootPath, "storage");
        Directory.CreateDirectory(storageDir);
        var path = Path.Combine(storageDir, "contact-submissions.json");

        await FileLock.WaitAsync(ct);
        try
        {
            var list = new List<JsonElement>();
            if (File.Exists(path))
            {
                await using var readStream = File.OpenRead(path);
                var existing = await JsonSerializer.DeserializeAsync<List<JsonElement>>(readStream, cancellationToken: ct);
                if (existing is not null) list = existing;
            }

            var serialized = JsonSerializer.SerializeToElement(submission, JsonOptions);
            list.Add(serialized);

            await using var writeStream = File.Create(path);
            await JsonSerializer.SerializeAsync(writeStream, list, JsonOptions, ct);
        }
        finally
        {
            FileLock.Release();
        }
    }

    private async Task TrySendEmailAsync(CreateContactDto dto, string id, CancellationToken ct)
    {
        var smtp = _configuration.GetSection("Smtp");
        var host = smtp["Host"];
        if (string.IsNullOrWhiteSpace(host))
        {
            _logger.LogInformation("SMTP not configured — skipping notification email for {Id}.", id);
            return;
        }

        try
        {
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(smtp["From"] ?? "no-reply@peterogba.dev"));
            message.To.Add(MailboxAddress.Parse(smtp["To"] ?? "peter4tech@gmail.com"));
            message.ReplyTo.Add(MailboxAddress.Parse(dto.Email));
            message.Subject = $"New project brief — {dto.Name} ({dto.ProjectType})";

            var body = new StringBuilder()
                .AppendLine($"Reference: {id}")
                .AppendLine($"Name:      {dto.Name}")
                .AppendLine($"Email:     {dto.Email}")
                .AppendLine($"Company:   {Coalesce(dto.Company)}")
                .AppendLine($"Type:      {Coalesce(dto.ProjectType)}")
                .AppendLine($"Budget:    {Coalesce(dto.Budget)}")
                .AppendLine($"Timeline:  {Coalesce(dto.Timeline)}")
                .AppendLine()
                .AppendLine(dto.Message.Trim())
                .ToString();
            message.Body = new TextPart("plain") { Text = body };

            using var client = new SmtpClient();
            var port = int.TryParse(smtp["Port"], out var p) ? p : 587;
            await client.ConnectAsync(host, port, SecureSocketOptions.StartTlsWhenAvailable, ct);
            if (!string.IsNullOrWhiteSpace(smtp["Username"]))
            {
                await client.AuthenticateAsync(smtp["Username"], smtp["Password"], ct);
            }
            await client.SendAsync(message, ct);
            await client.DisconnectAsync(true, ct);
        }
        catch (Exception ex)
        {
            // A failed email must not fail the request — the submission is already stored.
            _logger.LogWarning(ex, "Failed to send notification email for contact {Id}.", id);
        }
    }

    private static string Coalesce(string? value) =>
        string.IsNullOrWhiteSpace(value) ? "—" : value.Trim();
}
