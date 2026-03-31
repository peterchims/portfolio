using Microsoft.EntityFrameworkCore;
using PortfolioAPI.DTOs;
using PortfolioAPI.Models;
using PortfolioAPI.Data;

namespace PortfolioAPI.Services;

public interface IProjectService
{
    Task<List<ProjectDto>> GetAllProjectsAsync();
    Task<List<ProjectDto>> GetFeaturedProjectsAsync();
    Task<ProjectDto?> GetProjectByIdAsync(Guid id);
    Task<ProjectDto> CreateProjectAsync(CreateProjectDto dto);
    Task<ProjectDto> UpdateProjectAsync(Guid id, CreateProjectDto dto);
    Task DeleteProjectAsync(Guid id);
}

public class ProjectService : IProjectService
{
    private readonly PortfolioDbContext _context;

    public ProjectService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProjectDto>> GetAllProjectsAsync()
    {
        return await _context.Projects
            .OrderBy(p => p.Order)
            .Select(p => MapToDto(p))
            .ToListAsync();
    }

    public async Task<List<ProjectDto>> GetFeaturedProjectsAsync()
    {
        return await _context.Projects
            .Where(p => p.IsFeatured)
            .OrderBy(p => p.Order)
            .Select(p => MapToDto(p))
            .ToListAsync();
    }

    public async Task<ProjectDto?> GetProjectByIdAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id);
        return project != null ? MapToDto(project) : null;
    }

    public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto dto)
    {
        var project = new Project
        {
            Title = dto.Title,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl,
            Technologies = dto.Technologies,
            SourceCodeUrl = dto.SourceCodeUrl,
            LiveUrl = dto.LiveUrl,
            IsFeatured = dto.IsFeatured
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return MapToDto(project);
    }

    public async Task<ProjectDto> UpdateProjectAsync(Guid id, CreateProjectDto dto)
    {
        var project = await _context.Projects.FindAsync(id)
            ?? throw new KeyNotFoundException($"Project {id} not found");

        project.Title = dto.Title;
        project.Description = dto.Description;
        project.ImageUrl = dto.ImageUrl;
        project.Technologies = dto.Technologies;
        project.SourceCodeUrl = dto.SourceCodeUrl;
        project.LiveUrl = dto.LiveUrl;
        project.IsFeatured = dto.IsFeatured;
        project.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return MapToDto(project);
    }

    public async Task DeleteProjectAsync(Guid id)
    {
        var project = await _context.Projects.FindAsync(id)
            ?? throw new KeyNotFoundException($"Project {id} not found");

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
    }

    private static ProjectDto MapToDto(Project project)
    {
        return new ProjectDto
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            ImageUrl = project.ImageUrl,
            Technologies = project.Technologies,
            SourceCodeUrl = project.SourceCodeUrl,
            LiveUrl = project.LiveUrl,
            IsFeatured = project.IsFeatured,
            Order = project.Order
        };
    }
}
