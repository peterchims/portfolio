using System.Security.Cryptography;
using System.Text;

namespace PortfolioAPI.Services;

public interface IAdminAccessService
{
    bool IsConfigured { get; }
    bool IsAuthorized(string? token);
}

public class AdminAccessService : IAdminAccessService
{
    private readonly IConfiguration _configuration;

    public AdminAccessService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public bool IsConfigured => !string.IsNullOrWhiteSpace(GetConfiguredToken());

    public bool IsAuthorized(string? token)
    {
        var configuredToken = GetConfiguredToken();

        if (string.IsNullOrWhiteSpace(configuredToken) || string.IsNullOrWhiteSpace(token))
        {
            return false;
        }

        var providedBytes = Encoding.UTF8.GetBytes(token.Trim());
        var configuredBytes = Encoding.UTF8.GetBytes(configuredToken.Trim());

        return providedBytes.Length == configuredBytes.Length
            && CryptographicOperations.FixedTimeEquals(providedBytes, configuredBytes);
    }

    private string? GetConfiguredToken()
    {
        return _configuration["PortfolioAdmin:Token"]
            ?? _configuration["PORTFOLIO_ADMIN_TOKEN"];
    }
}
