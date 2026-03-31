using System.Text.Json;
using PortfolioAPI.DTOs;

namespace PortfolioAPI.Services;

public interface ISiteContentService
{
    Task<SitePayloadDto> GetSiteContentAsync(CancellationToken cancellationToken = default);
}

public class SiteContentService : ISiteContentService
{
    private const string ContentFileName = "portfolio-site-content.json";

    private readonly IWebHostEnvironment _environment;
    private readonly JsonSerializerOptions _serializerOptions = new(JsonSerializerDefaults.Web)
    {
        PropertyNameCaseInsensitive = true,
    };

    public SiteContentService(IWebHostEnvironment environment)
    {
        _environment = environment;
    }

    public async Task<SitePayloadDto> GetSiteContentAsync(CancellationToken cancellationToken = default)
    {
        var contentPath = ResolveContentPath();

        await using var stream = File.OpenRead(contentPath);
        var content = await JsonSerializer.DeserializeAsync<PortfolioSiteContentDto>(
            stream,
            _serializerOptions,
            cancellationToken);

        if (content is null)
        {
            throw new InvalidOperationException("Shared portfolio content could not be loaded.");
        }

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
