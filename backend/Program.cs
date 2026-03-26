var builder = WebApplicationBuilder.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
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

// Database configuration
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Host=localhost;Database=portfolio_db;Username=postgres;Password=postgres";

builder.Services.AddDbContext<PortfolioAPI.Data.PortfolioDbContext>(options =>
    options.UseNpgsql(connectionString));

// Services
builder.Services.AddScoped<PortfolioAPI.Services.IProjectService, PortfolioAPI.Services.ProjectService>();
builder.Services.AddScoped<PortfolioAPI.Services.IBlogService, PortfolioAPI.Services.BlogService>();
builder.Services.AddScoped<PortfolioAPI.Services.IContactService, PortfolioAPI.Services.ContactService>();
builder.Services.AddScoped<PortfolioAPI.Services.ITestimonialService, PortfolioAPI.Services.TestimonialService>();
builder.Services.AddScoped<PortfolioAPI.Services.ISkillService, PortfolioAPI.Services.SkillService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Health check endpoint
app.MapGet("/api/health", () => new { status = "ok", timestamp = DateTime.UtcNow })
    .WithName("Health")
    .WithOpenApi();

// Database migration
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioAPI.Data.PortfolioDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
