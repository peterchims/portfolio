using Microsoft.EntityFrameworkCore;
using PortfolioAPI.DTOs;
using PortfolioAPI.Models;
using PortfolioAPI.Data;
using System.Text.RegularExpressions;

namespace PortfolioAPI.Services;

public interface IBlogService
{
    Task<(List<BlogPostDto> Posts, int Total)> GetBlogPostsAsync(int page = 1, int pageSize = 10, string? category = null);
    Task<BlogPostDto?> GetPostBySlugAsync(string slug);
    Task<BlogPostDto> CreatePostAsync(CreateBlogPostDto dto);
    Task<BlogPostDto> UpdatePostAsync(Guid id, CreateBlogPostDto dto);
    Task DeletePostAsync(Guid id);
}

public class BlogService : IBlogService
{
    private readonly PortfolioDbContext _context;

    public BlogService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<(List<BlogPostDto> Posts, int Total)> GetBlogPostsAsync(int page = 1, int pageSize = 10, string? category = null)
    {
        var query = _context.BlogPosts.Where(b => b.IsPublished);
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(b => b.Category == category);

        var total = await query.CountAsync();
        var posts = await query
            .OrderByDescending(b => b.PublishedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => MapToDto(p))
            .ToListAsync();

        return (posts, total);
    }

    public async Task<BlogPostDto?> GetPostBySlugAsync(string slug)
    {
        var post = await _context.BlogPosts
            .FirstOrDefaultAsync(b => b.Slug == slug && b.IsPublished);
        
        if (post != null)
        {
            post.ViewCount++;
            await _context.SaveChangesAsync();
        }

        return post != null ? MapToDto(post) : null;
    }

    public async Task<BlogPostDto> CreatePostAsync(CreateBlogPostDto dto)
    {
        var post = new BlogPost
        {
            Title = dto.Title,
            Slug = GenerateSlug(dto.Title),
            Content = dto.Content,
            Excerpt = dto.Excerpt,
            ThumbnailUrl = dto.ThumbnailUrl,
            Tags = dto.Tags,
            Category = dto.Category,
            IsPublished = false
        };

        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();
        return MapToDto(post);
    }

    public async Task<BlogPostDto> UpdatePostAsync(Guid id, CreateBlogPostDto dto)
    {
        var post = await _context.BlogPosts.FindAsync(id)
            ?? throw new KeyNotFoundException($"Blog post {id} not found");

        post.Title = dto.Title;
        post.Slug = GenerateSlug(dto.Title);
        post.Content = dto.Content;
        post.Excerpt = dto.Excerpt;
        post.ThumbnailUrl = dto.ThumbnailUrl;
        post.Tags = dto.Tags;
        post.Category = dto.Category;
        post.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return MapToDto(post);
    }

    public async Task DeletePostAsync(Guid id)
    {
        var post = await _context.BlogPosts.FindAsync(id)
            ?? throw new KeyNotFoundException($"Blog post {id} not found");

        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();
    }

    private static string GenerateSlug(string title)
    {
        var slug = Regex.Replace(title.ToLower(), @"[^a-z0-9]+", "-").Trim('-');
        return Regex.Replace(slug, @"-+", "-");
    }

    private static BlogPostDto MapToDto(BlogPost post)
    {
        return new BlogPostDto
        {
            Id = post.Id,
            Title = post.Title,
            Slug = post.Slug,
            Content = post.Content,
            Excerpt = post.Excerpt,
            ThumbnailUrl = post.ThumbnailUrl,
            Tags = post.Tags,
            Category = post.Category,
            IsPublished = post.IsPublished,
            ViewCount = post.ViewCount,
            PublishedAt = post.PublishedAt
        };
    }
}
