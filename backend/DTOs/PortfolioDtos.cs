using System.ComponentModel.DataAnnotations;

namespace PortfolioAPI.DTOs;

public class CreateContactDto
{
    [Required, StringLength(120, MinimumLength = 2)]
    public string Name { get; set; } = string.Empty;

    [Required, EmailAddress, StringLength(200)]
    public string Email { get; set; } = string.Empty;

    [StringLength(160)]
    public string Company { get; set; } = string.Empty;

    [StringLength(80)]
    public string ProjectType { get; set; } = string.Empty;

    [StringLength(40)]
    public string Budget { get; set; } = string.Empty;

    [StringLength(40)]
    public string Timeline { get; set; } = string.Empty;

    [Required, StringLength(4000, MinimumLength = 10)]
    public string Message { get; set; } = string.Empty;
}

public class ContactSubmissionResponseDto
{
    public bool Ok { get; set; }
    public string Message { get; set; } = string.Empty;
    public string SubmissionId { get; set; } = string.Empty;
}

public class InteractionDto
{
    public string Event { get; set; } = string.Empty;
    public string? Section { get; set; }
    public string? Label { get; set; }
}

public class HealthDto
{
    public string Status { get; set; } = string.Empty;
    public string Environment { get; set; } = string.Empty;
    public double UptimeSeconds { get; set; }
}
