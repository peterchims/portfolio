using System.Text.Json;
using System.Text.Json.Serialization;
using PortfolioAPI.DTOs;

namespace PortfolioAPI.Services;

public interface ISiteContentService
{
    Task<SitePayloadDto> GetSiteContentAsync(CancellationToken cancellationToken = default);
    Task<PortfolioSiteContentDto> GetEditableContentAsync(CancellationToken cancellationToken = default);
    Task<SitePayloadDto> UpdateSiteContentAsync(
        PortfolioSiteContentDto content,
        CancellationToken cancellationToken = default);
}

public class SiteContentService : ISiteContentService
{
    private const string ContentFileName = "portfolio-site-content.json";

    private readonly IWebHostEnvironment _environment;
    private readonly JsonSerializerOptions _serializerOptions = new(JsonSerializerDefaults.Web)
    {
        PropertyNameCaseInsensitive = true,
    };
    private readonly JsonSerializerOptions _writeSerializerOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    public SiteContentService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<SitePayloadDto> GetSiteContentAsync(CancellationToken cancellationToken = default)
    {
        var contentPath = ResolveContentPath();
        var content = await ReadContentAsync(contentPath, cancellationToken);

        return new SitePayloadDto
        {
            Data = content,
            Meta = new SiteMetaDto
            {
                UpdatedAt = File.GetLastWriteTimeUtc(contentPath).ToString("O"),
                Source = "shared-json",
            },
        };
    }

    public async Task<PortfolioSiteContentDto> GetEditableContentAsync(
        CancellationToken cancellationToken = default)
    {
        var contentPath = ResolveContentPath();
        return await ReadContentAsync(contentPath, cancellationToken);
    }

    public async Task<SitePayloadDto> UpdateSiteContentAsync(
        PortfolioSiteContentDto content,
        CancellationToken cancellationToken = default)
    {
        var contentPath = ResolveContentPath();
        var directoryPath = Path.GetDirectoryName(contentPath);

        if (!string.IsNullOrWhiteSpace(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }

        var serialized = JsonSerializer.Serialize(content, _writeSerializerOptions);
        await File.WriteAllTextAsync(contentPath, serialized + Environment.NewLine, cancellationToken);

        return await GetSiteContentAsync(cancellationToken);
    }

    private async Task<PortfolioSiteContentDto> ReadContentAsync(
        string contentPath,
        CancellationToken cancellationToken)
    {
        await using var stream = File.OpenRead(contentPath);
        var content = await JsonSerializer.DeserializeAsync<PortfolioSiteContentDto>(
            stream,
            _serializerOptions,
            cancellationToken);

        if (content is null)
        {
            throw new InvalidOperationException("Shared portfolio content could not be loaded.");
        }

        return content;
    }

    private string ResolveContentPath()
    {
        var candidatePaths = new[]
        {
            Path.Combine(_environment.ContentRootPath, "Content", ContentFileName),
            Path.GetFullPath(Path.Combine(_environment.ContentRootPath, "..", "shared", ContentFileName)),
            Path.GetFullPath(Path.Combine(_environment.ContentRootPath, "..", "..", "shared", ContentFileName)),
        };

        return candidatePaths.FirstOrDefault(File.Exists)
            ?? throw new FileNotFoundException("Unable to locate the shared portfolio content file.", ContentFileName);
    }
}
