using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Models;

namespace PortfolioAPI.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
    public DbSet<Skill> Skills => Set<Skill>();
    public DbSet<ChatConversation> ChatConversations => Set<ChatConversation>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
    public DbSet<AutomatedResponse> AutomatedResponses => Set<AutomatedResponse>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Project configuration
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Technologies).HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
        });

        // BlogPost configuration
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Slug).IsRequired().HasMaxLength(255);
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.Property(e => e.Tags).HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
        });

        // Contact configuration
        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Status).HasConversion<string>();
        });

        // Testimonial configuration
        modelBuilder.Entity<Testimonial>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(255);
        });

        // Skill configuration
        modelBuilder.Entity<Skill>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Category).IsRequired().HasMaxLength(100);
        });

        // Chat Conversation configuration
        modelBuilder.Entity<ChatConversation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.VisitorId).IsRequired();
            entity.Property(e => e.VisitorName).IsRequired().HasMaxLength(255);
            entity.Property(e => e.VisitorEmail).IsRequired().HasMaxLength(255);
            entity.HasMany(e => e.Messages)
                .WithOne()
                .HasForeignKey(e => e.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasIndex(e => e.VisitorId);
        });

        // Chat Message configuration
        modelBuilder.Entity<ChatMessage>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Content).IsRequired();
            entity.Property(e => e.Sender).HasConversion<string>();
            entity.HasIndex(e => e.ConversationId);
        });

        // Automated Response configuration
        modelBuilder.Entity<AutomatedResponse>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Keyword).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Response).IsRequired();
            entity.HasIndex(e => e.Keyword);
        });
    }
}
