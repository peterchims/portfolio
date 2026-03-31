namespace PortfolioAPI.DTOs;

public class ProjectDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public List<string> Technologies { get; set; } = new();
    public string? SourceCodeUrl { get; set; }
    public string? LiveUrl { get; set; }
    public bool IsFeatured { get; set; }
    public int Order { get; set; }
}

public class CreateProjectDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public List<string> Technologies { get; set; } = new();
    public string? SourceCodeUrl { get; set; }
    public string? LiveUrl { get; set; }
    public bool IsFeatured { get; set; }
}

public class BlogPostDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? ThumbnailUrl { get; set; }
    public List<string> Tags { get; set; } = new();
    public string Category { get; set; } = string.Empty;
    public bool IsPublished { get; set; }
    public int ViewCount { get; set; }
    public DateTime? PublishedAt { get; set; }
}

public class CreateBlogPostDto
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? ThumbnailUrl { get; set; }
    public List<string> Tags { get; set; } = new();
    public string Category { get; set; } = string.Empty;
}

public class ContactDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
}

public class CreateContactDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string ProjectType { get; set; } = string.Empty;
    public string Budget { get; set; } = string.Empty;
    public string Timeline { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string? Subject { get; set; }
}

public class ContactSubmissionResponseDto
{
    public bool Ok { get; set; }
    public string Message { get; set; } = string.Empty;
    public string SubmissionId { get; set; } = string.Empty;
}

public class TestimonialDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public int Rating { get; set; }
}

public class CreateTestimonialDto
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public int Rating { get; set; } = 5;
}

public class SkillDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Proficiency { get; set; }
    public string? Icon { get; set; }
}

public class CreateSkillDto
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Proficiency { get; set; } = 50;
    public string? Icon { get; set; }
    public int Order { get; set; }
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
    public string Timestamp { get; set; } = string.Empty;
    public string StartedAt { get; set; } = string.Empty;
    public double UptimeSeconds { get; set; }
    public string Environment { get; set; } = string.Empty;
}
