namespace PortfolioAPI.DTOs;

public class ChatConversationDto
{
    public Guid Id { get; set; }
    public string VisitorId { get; set; } = string.Empty;
    public string VisitorName { get; set; } = string.Empty;
    public string VisitorEmail { get; set; } = string.Empty;
    public List<ChatMessageDto> Messages { get; set; } = new();
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ChatMessageDto
{
    public Guid Id { get; set; }
    public Guid ConversationId { get; set; }
    public string Content { get; set; } = string.Empty;
    public string Sender { get; set; } = string.Empty;
    public bool IsAutomated { get; set; }
    public string? SenderName { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class StartConversationDto
{
    public string VisitorName { get; set; } = string.Empty;
    public string VisitorEmail { get; set; } = string.Empty;
    public string InitialMessage { get; set; } = string.Empty;
}

public class SendMessageDto
{
    public Guid ConversationId { get; set; }
    public string Content { get; set; } = string.Empty;
}

public class PortfolioDataDto
{
    public Guid Id { get; set; }
    public List<ProjectDto> Projects { get; set; } = new();
    public List<SkillDto> Skills { get; set; } = new();
    public Dictionary<string, List<SkillDto>> SkillsByCategory { get; set; } = new();
    public List<TestimonialDto> Testimonials { get; set; } = new();
    public ProfileDto Profile { get; set; } = new();
    public DateTime LastUpdated { get; set; }
}

public class ProfileDto
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
    public List<SocialLinkDto> SocialLinks { get; set; } = new();
}

public class SocialLinkDto
{
    public string Platform { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Handle { get; set; } = string.Empty;
}
