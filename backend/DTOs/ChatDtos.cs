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


