using PortfolioAPI.DTOs;
using PortfolioAPI.Services;

var startedAtUtc = DateTime.UtcNow;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IContactService, ContactService>();

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? new[] { "http://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
        policy.WithOrigins(allowedOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("frontend");
app.MapControllers();

app.MapGet("/api/health", (IHostEnvironment environment) => Results.Ok(new HealthDto
{
    Status = "ok",
    Environment = environment.EnvironmentName,
    UptimeSeconds = Math.Round((DateTime.UtcNow - startedAtUtc).TotalSeconds, 2),
}));

app.MapPost("/api/interactions", (InteractionDto dto, ILoggerFactory loggerFactory) =>
{
    loggerFactory
        .CreateLogger("PortfolioInteractions")
        .LogInformation("Interaction: {Event} {Section} {Label}", dto.Event, dto.Section, dto.Label);
    return Results.Ok(new { ok = true });
});

app.Run();
