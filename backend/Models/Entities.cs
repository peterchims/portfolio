namespace PortfolioAPI.Models;

public class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public class Project : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public List<string> Technologies { get; set; } = new();
    public string? SourceCodeUrl { get; set; }
    public string? LiveUrl { get; set; }
    public bool IsFeatured { get; set; }
    public int Order { get; set; }
}

public class BlogPost : BaseEntity
{
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

public class Contact : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public ContactStatus Status { get; set; } = ContactStatus.New;
    public string? IpAddress { get; set; }
}

public enum ContactStatus
{
    New,
    Read,
    Replied
}

public class Testimonial : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public int Rating { get; set; } = 5;
    public bool IsApproved { get; set; }
}

public class Skill : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Proficiency { get; set; } = 50;
    public string? Icon { get; set; }
    public int Order { get; set; }
}
