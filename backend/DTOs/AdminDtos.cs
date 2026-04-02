namespace PortfolioAPI.DTOs;

public class AdminSessionRequestDto
{
    public string Token { get; set; } = string.Empty;
}

public class AdminSessionResponseDto
{
    public bool Ok { get; set; }
    public string Message { get; set; } = string.Empty;
}
