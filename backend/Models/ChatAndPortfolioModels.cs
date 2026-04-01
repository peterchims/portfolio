namespace PortfolioAPI.Models;

public class ChatConversation : BaseEntity
{
    public string VisitorId { get; set; } = string.Empty;
    public string VisitorName { get; set; } = string.Empty;
    public string VisitorEmail { get; set; } = string.Empty;
    public List<ChatMessage> Messages { get; set; } = new();
    public bool IsActive { get; set; } = true;
    public int MessageCount { get; set; }
}

public class ChatMessage : BaseEntity
{
    public Guid ConversationId { get; set; }
    public string Content { get; set; } = string.Empty;
    public MessageSender Sender { get; set; }
    public bool IsAutomated { get; set; }
    public string? SenderName { get; set; }
    public int? TokenCount { get; set; }
}

public enum MessageSender
{
    Visitor,
    System,
    Admin
}

public class PortfolioData
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public List<PortfolioProject> Projects { get; set; } = new();
    public List<PortfolioSkill> Skills { get; set; } = new();
    public List<PortfolioTestimonial> Testimonials { get; set; } = new();
    public PortfolioProfile Profile { get; set; } = new();
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}

public class PortfolioProject
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public List<string> Technologies { get; set; } = new();
    public string? SourceCodeUrl { get; set; }
    public string? LiveUrl { get; set; }
    public bool IsFeatured { get; set; }
    public int Order { get; set; }
}

public class PortfolioSkill
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Proficiency { get; set; }
    public string? Icon { get; set; }
}

public class PortfolioTestimonial
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int Rating { get; set; }
}

public class PortfolioProfile
{
    public string Name { get; set; } = "Peter4Tech";
    public string Role { get; set; } = "Full-Stack Developer & Digital Solutions Architect";
    public string Bio { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
    public List<SocialLink> SocialLinks { get; set; } = new();
}

public class SocialLink
{
    public string Platform { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Handle { get; set; } = string.Empty;
}

public class AutomatedResponse
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Keyword { get; set; } = string.Empty;
    public string Response { get; set; } = string.Empty;
    public int Priority { get; set; }
    public bool IsActive { get; set; } = true;
}
