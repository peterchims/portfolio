using Microsoft.EntityFrameworkCore;
using PortfolioAPI.DTOs;
using PortfolioAPI.Models;
using PortfolioAPI.Data;

namespace PortfolioAPI.Services;

public interface IChatService
{
    Task<ChatConversationDto> StartConversationAsync(StartConversationDto dto);
    Task<ChatConversationDto> SendMessageAsync(SendMessageDto dto);
    Task<ChatConversationDto?> GetConversationAsync(Guid conversationId);
    Task<List<ChatConversationDto>> GetAllConversationsAsync();
    Task<ChatMessageDto> GetAutomatedResponseAsync(string userMessage);
}

public class ChatService : IChatService
{
    private readonly PortfolioDbContext _context;
    private readonly ILogger<ChatService> _logger;

    public ChatService(PortfolioDbContext context, ILogger<ChatService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ChatConversationDto> StartConversationAsync(StartConversationDto dto)
    {
        var visitorId = Guid.NewGuid().ToString();
        var conversation = new ChatConversation
        {
            VisitorId = visitorId,
            VisitorName = dto.VisitorName,
            VisitorEmail = dto.VisitorEmail,
            IsActive = true,
        };

        _context.ChatConversations.Add(conversation);
        await _context.SaveChangesAsync();

        // Add initial user message
        var userMessage = new ChatMessage
        {
            ConversationId = conversation.Id,
            Content = dto.InitialMessage,
            Sender = MessageSender.Visitor,
            IsAutomated = false,
            SenderName = dto.VisitorName,
        };

        _context.ChatMessages.Add(userMessage);

        // Generate automated response
        var automatedMessage = await GetAutomatedResponseAsync(dto.InitialMessage);
        var systemMessage = new ChatMessage
        {
            ConversationId = conversation.Id,
            Content = automatedMessage.Content,
            Sender = MessageSender.System,
            IsAutomated = true,
            SenderName = "Peter4Tech Assistant",
        };

        _context.ChatMessages.Add(systemMessage);
        conversation.MessageCount = 2;
        await _context.SaveChangesAsync();

        return MapToDto(conversation);
    }

    public async Task<ChatConversationDto> SendMessageAsync(SendMessageDto dto)
    {
        var conversation = await _context.ChatConversations
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == dto.ConversationId);

        if (conversation == null)
            throw new KeyNotFoundException("Conversation not found");

        // Add user message
        var userMessage = new ChatMessage
        {
            ConversationId = conversation.Id,
            Content = dto.Content,
            Sender = MessageSender.Visitor,
            IsAutomated = false,
            SenderName = conversation.VisitorName,
        };

        _context.ChatMessages.Add(userMessage);

        // Generate automated response
        var automatedMessage = await GetAutomatedResponseAsync(dto.Content);
        var systemMessage = new ChatMessage
        {
            ConversationId = conversation.Id,
            Content = automatedMessage.Content,
            Sender = MessageSender.System,
            IsAutomated = true,
            SenderName = "Peter4Tech Assistant",
        };

        _context.ChatMessages.Add(systemMessage);
        conversation.MessageCount += 2;
        conversation.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return MapToDto(conversation);
    }

    public async Task<ChatConversationDto?> GetConversationAsync(Guid conversationId)
    {
        var conversation = await _context.ChatConversations
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == conversationId);

        return conversation != null ? MapToDto(conversation) : null;
    }

    public async Task<List<ChatConversationDto>> GetAllConversationsAsync()
    {
        var conversations = await _context.ChatConversations
            .Include(c => c.Messages)
            .OrderByDescending(c => c.UpdatedAt)
            .ToListAsync();

        return conversations.Select(MapToDto).ToList();
    }

    public async Task<ChatMessageDto> GetAutomatedResponseAsync(string userMessage)
    {
        var lowerMessage = userMessage.ToLower();

        // Check for keyword matches in automated responses
        var automatedResponse = await _context.AutomatedResponses
            .FirstOrDefaultAsync(a => a.IsActive && lowerMessage.Contains(a.Keyword.ToLower()));

        if (automatedResponse != null)
        {
            return new ChatMessageDto
            {
                Content = automatedResponse.Response,
                Sender = "System",
                IsAutomated = true,
            };
        }

        // Default responses based on common patterns
        var response = DetermineDefaultResponse(userMessage);

        return new ChatMessageDto
        {
            Content = response,
            Sender = "System",
            IsAutomated = true,
        };
    }

    private static string DetermineDefaultResponse(string userMessage)
    {
        var lower = userMessage.ToLower();

        return lower switch
        {
            // Project inquiries
            _ when lower.Contains("project") || lower.Contains("portfolio") =>
                "Great! You can explore all my featured projects on the 'Featured Projects' section. I specialize in full-stack development with React, .NET, and modern cloud architectures. Would you like to know more about a specific type of project?",

            // Service inquiries
            _ when lower.Contains("service") || lower.Contains("build") || lower.Contains("develop") =>
                "I provide comprehensive services including: Full-Stack Web Development, SaaS Solutions, Cloud Architecture, DevOps & Infrastructure, and AI Integration. Which area interests you most?",

            // Technology stack
            _ when lower.Contains("tech") || lower.Contains("technology") || lower.Contains("stack") =>
                "I work with modern technologies including React, TypeScript, .NET Core, PostgreSQL, Docker, AWS, and more. I stay updated with the latest industry trends. What tech challenges are you facing?",

            // Timeline/pricing
            _ when lower.Contains("price") || lower.Contains("cost") || lower.Contains("budget") =>
                "I offer flexible engagement models tailored to your project scope and requirements. Let's discuss your specific needs and I can provide a detailed proposal.",

            // Experience/background
            _ when lower.Contains("experience") || lower.Contains("background") || lower.Contains("expertise") =>
                "With 10+ years in software development, I've led teams in building scalable applications for startups and enterprises. My expertise spans full-stack development, cloud architecture, and technical leadership.",

            // Contact/meeting
            _ when lower.Contains("contact") || lower.Contains("call") || lower.Contains("meet") || lower.Contains("meeting") =>
                "I'd love to connect! You can reach me via email, schedule a call, or let's have a quick chat about your project. What works best for you?",

            // Timeline questions
            _ when lower.Contains("timeline") || lower.Contains("deadline") || lower.Contains("how long") =>
                "Project timelines depend on scope and complexity. Typical projects range from 4-16 weeks. Let's discuss your requirements to give you an accurate estimate.",

            // Availability
            _ when lower.Contains("available") || lower.Contains("busy") || lower.Contains("take on") =>
                "I'm currently available for new projects. I take on focused engagements to ensure quality delivery. Let's explore if we're a good fit!",

            // General greeting
            _ when lower.Contains("hello") || lower.Contains("hi") || lower.Contains("hey") =>
                "Hello! Welcome to my portfolio. I'm Peter, a full-stack developer specializing in building beautiful and scalable digital solutions. How can I help you today?",

            // Thanks/Gratitude
            _ when lower.Contains("thank") => "You're welcome! Feel free to ask any other questions or explore my portfolio.",

            // Default
            _ => "That's a great question! I'd be happy to help. Could you tell me more about your needs? Are you interested in a specific project, technology, or service?"
        };
    }

    private static ChatConversationDto MapToDto(ChatConversation conversation)
    {
        return new ChatConversationDto
        {
            Id = conversation.Id,
            VisitorId = conversation.VisitorId,
            VisitorName = conversation.VisitorName,
            VisitorEmail = conversation.VisitorEmail,
            IsActive = conversation.IsActive,
            CreatedAt = conversation.CreatedAt,
            Messages = conversation.Messages
                .OrderBy(m => m.CreatedAt)
                .Select(m => new ChatMessageDto
                {
                    Id = m.Id,
                    ConversationId = m.ConversationId,
                    Content = m.Content,
                    Sender = m.Sender.ToString(),
                    IsAutomated = m.IsAutomated,
                    SenderName = m.SenderName,
                    CreatedAt = m.CreatedAt,
                })
                .ToList(),
        };
    }
}
