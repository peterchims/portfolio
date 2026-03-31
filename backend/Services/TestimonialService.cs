using Microsoft.EntityFrameworkCore;
using PortfolioAPI.DTOs;
using PortfolioAPI.Models;
using PortfolioAPI.Data;

namespace PortfolioAPI.Services;

public interface ITestimonialService
{
    Task<List<TestimonialDto>> GetApprovedTestimonialsAsync();
    Task<List<TestimonialDto>> GetAllTestimonialsAsync();
    Task<TestimonialDto?> GetTestimonialByIdAsync(Guid id);
    Task<TestimonialDto> CreateTestimonialAsync(CreateTestimonialDto dto);
    Task<TestimonialDto> UpdateTestimonialAsync(Guid id, CreateTestimonialDto dto);
    Task ApproveTestimonialAsync(Guid id);
    Task DeleteTestimonialAsync(Guid id);
}

public class TestimonialService : ITestimonialService
{
    private readonly PortfolioDbContext _context;

    public TestimonialService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<TestimonialDto>> GetApprovedTestimonialsAsync()
    {
        return await _context.Testimonials
            .Where(t => t.IsApproved)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => MapToDto(t))
            .ToListAsync();
    }

    public async Task<List<TestimonialDto>> GetAllTestimonialsAsync()
    {
        return await _context.Testimonials
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => MapToDto(t))
            .ToListAsync();
    }

    public async Task<TestimonialDto?> GetTestimonialByIdAsync(Guid id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        return testimonial != null ? MapToDto(testimonial) : null;
    }

    public async Task<TestimonialDto> CreateTestimonialAsync(CreateTestimonialDto dto)
    {
        var testimonial = new Testimonial
        {
            Name = dto.Name,
            Title = dto.Title,
            Company = dto.Company,
            Content = dto.Content,
            ImageUrl = dto.ImageUrl,
            Rating = dto.Rating,
            IsApproved = false
        };

        _context.Testimonials.Add(testimonial);
        await _context.SaveChangesAsync();
        return MapToDto(testimonial);
    }

    public async Task<TestimonialDto> UpdateTestimonialAsync(Guid id, CreateTestimonialDto dto)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null)
            throw new KeyNotFoundException($"Testimonial with ID {id} not found");

        testimonial.Name = dto.Name;
        testimonial.Title = dto.Title;
        testimonial.Company = dto.Company;
        testimonial.Content = dto.Content;
        testimonial.ImageUrl = dto.ImageUrl;
        testimonial.Rating = dto.Rating;
        testimonial.UpdatedAt = DateTime.UtcNow;

        _context.Testimonials.Update(testimonial);
        await _context.SaveChangesAsync();
        return MapToDto(testimonial);
    }

    public async Task ApproveTestimonialAsync(Guid id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null)
            throw new KeyNotFoundException($"Testimonial with ID {id} not found");

        testimonial.IsApproved = true;
        testimonial.UpdatedAt = DateTime.UtcNow;

        _context.Testimonials.Update(testimonial);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteTestimonialAsync(Guid id)
    {
        var testimonial = await _context.Testimonials.FindAsync(id);
        if (testimonial == null)
            throw new KeyNotFoundException($"Testimonial with ID {id} not found");

        _context.Testimonials.Remove(testimonial);
        await _context.SaveChangesAsync();
    }

    private static TestimonialDto MapToDto(Testimonial testimonial)
    {
        return new TestimonialDto
        {
            Id = testimonial.Id,
            Name = testimonial.Name,
            Title = testimonial.Title,
            Company = testimonial.Company,
            Content = testimonial.Content,
            ImageUrl = testimonial.ImageUrl,
            Rating = testimonial.Rating
        };
    }
}
