using Microsoft.EntityFrameworkCore;
using PortfolioAPI.DTOs;
using PortfolioAPI.Models;
using PortfolioAPI.Data;

namespace PortfolioAPI.Services;

public interface ISkillService
{
    Task<List<SkillDto>> GetAllSkillsAsync();
    Task<List<(string Category, List<SkillDto> Skills)>> GetSkillsByCategoryAsync();
    Task<SkillDto?> GetSkillByIdAsync(Guid id);
    Task<SkillDto> CreateSkillAsync(CreateSkillDto dto);
    Task<SkillDto> UpdateSkillAsync(Guid id, CreateSkillDto dto);
    Task DeleteSkillAsync(Guid id);
}

public class SkillService : ISkillService
{
    private readonly PortfolioDbContext _context;

    public SkillService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<SkillDto>> GetAllSkillsAsync()
    {
        return await _context.Skills
            .OrderBy(s => s.Category)
            .ThenBy(s => s.Order)
            .Select(s => MapToDto(s))
            .ToListAsync();
    }

    public async Task<List<(string Category, List<SkillDto> Skills)>> GetSkillsByCategoryAsync()
    {
        var skills = await _context.Skills
            .OrderBy(s => s.Category)
            .ThenBy(s => s.Order)
            .ToListAsync();

        return skills
            .GroupBy(s => s.Category)
            .Select(g => (g.Key, g.Select(MapToDto).ToList()))
            .ToList();
    }

    public async Task<SkillDto?> GetSkillByIdAsync(Guid id)
    {
        var skill = await _context.Skills.FindAsync(id);
        return skill != null ? MapToDto(skill) : null;
    }

    public async Task<SkillDto> CreateSkillAsync(CreateSkillDto dto)
    {
        var skill = new Skill
        {
            Name = dto.Name,
            Category = dto.Category,
            Proficiency = dto.Proficiency,
            Icon = dto.Icon,
            Order = dto.Order
        };

        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();
        return MapToDto(skill);
    }

    public async Task<SkillDto> UpdateSkillAsync(Guid id, CreateSkillDto dto)
    {
        var skill = await _context.Skills.FindAsync(id);
        if (skill == null)
            throw new KeyNotFoundException($"Skill with ID {id} not found");

        skill.Name = dto.Name;
        skill.Category = dto.Category;
        skill.Proficiency = dto.Proficiency;
        skill.Icon = dto.Icon;
        skill.Order = dto.Order;
        skill.UpdatedAt = DateTime.UtcNow;

        _context.Skills.Update(skill);
        await _context.SaveChangesAsync();
        return MapToDto(skill);
    }

    public async Task DeleteSkillAsync(Guid id)
    {
        var skill = await _context.Skills.FindAsync(id);
        if (skill == null)
            throw new KeyNotFoundException($"Skill with ID {id} not found");

        _context.Skills.Remove(skill);
        await _context.SaveChangesAsync();
    }

    private static SkillDto MapToDto(Skill skill)
    {
        return new SkillDto
        {
            Id = skill.Id,
            Name = skill.Name,
            Category = skill.Category,
            Proficiency = skill.Proficiency,
            Icon = skill.Icon
        };
    }
}
