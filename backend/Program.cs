using Microsoft.EntityFrameworkCore;
using PortfolioAPI.DTOs;
using PortfolioAPI.Services;

var startedAtUtc = DateTime.UtcNow;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? "Host=localhost;Database=portfolio_db;Username=postgres;Password=postgres";

builder.Services.AddDbContext<PortfolioAPI.Data.PortfolioDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IContactService, ContactService>();
builder.Services.AddScoped<ITestimonialService, TestimonialService>();
builder.Services.AddScoped<ISkillService, SkillService>();
builder.Services.AddScoped<ISiteContentService, SiteContentService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddSingleton<IAdminAccessService, AdminAccessService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.MapGet("/api/site", async (ISiteContentService siteContentService, CancellationToken cancellationToken) =>
{
    var sitePayload = await siteContentService.GetSiteContentAsync(cancellationToken);
    return Results.Ok(sitePayload);
})
.WithName("SiteContent");

app.MapGet("/api/health", (IHostEnvironment environment) =>
{
    var now = DateTime.UtcNow;
    return Results.Ok(new HealthDto
    {
        Status = "ok",
        Timestamp = now.ToString("O"),
        StartedAt = startedAtUtc.ToString("O"),
        UptimeSeconds = Math.Round((now - startedAtUtc).TotalSeconds, 2),
        Environment = environment.EnvironmentName,
    });
})
.WithName("Health");

app.MapPost("/api/interactions", (InteractionDto dto, ILoggerFactory loggerFactory) =>
{
    var logger = loggerFactory.CreateLogger("PortfolioInteractions");
    logger.LogInformation(
        "Portfolio interaction received: {Event} {Section} {Label}",
        dto.Event,
        dto.Section,
        dto.Label);

    return Results.Ok(new { ok = true });
})
.WithName("TrackInteraction");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioAPI.Data.PortfolioDbContext>();
    var startupLogger = scope.ServiceProvider
        .GetRequiredService<ILoggerFactory>()
        .CreateLogger("Startup");

    try
    {
        dbContext.Database.Migrate();
    }
    catch (Exception ex)
    {
        startupLogger.LogWarning(
            ex,
            "Skipping database migrations during startup because the database is unavailable.");
    }
}

app.Run();
