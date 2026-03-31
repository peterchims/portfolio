using Microsoft.EntityFrameworkCore;
using PortfolioAPI.Data;
using PortfolioAPI.DTOs;
using PortfolioAPI.Models;

namespace PortfolioAPI.Services;

public interface IContactService
{
    Task<ContactDto> SubmitContactAsync(CreateContactDto dto, string? ipAddress = null);
    Task<List<ContactDto>> GetAllContactsAsync();
    Task<ContactDto?> GetContactByIdAsync(Guid id);
    Task UpdateContactStatusAsync(Guid id, string status);
    Task DeleteContactAsync(Guid id);
}

public class ContactService : IContactService
{
    private readonly PortfolioDbContext _context;

    public ContactService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<ContactDto> SubmitContactAsync(CreateContactDto dto, string? ipAddress = null)
    {
        var subject = BuildSubject(dto);
        var message = BuildMessage(dto);

        var contact = new Contact
        {
            Name = dto.Name,
            Email = dto.Email,
            Subject = subject,
            Message = message,
            IpAddress = ipAddress,
        };

        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();
        return MapToDto(contact);
    }

    public async Task<List<ContactDto>> GetAllContactsAsync()
    {
        return await _context.Contacts
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => MapToDto(c))
            .ToListAsync();
    }

    public async Task<ContactDto?> GetContactByIdAsync(Guid id)
    {
        var contact = await _context.Contacts.FindAsync(id);
        return contact != null ? MapToDto(contact) : null;
    }

    public async Task UpdateContactStatusAsync(Guid id, string status)
    {
        var contact = await _context.Contacts.FindAsync(id)
            ?? throw new KeyNotFoundException($"Contact {id} not found");

        if (Enum.TryParse<ContactStatus>(status, true, out var contactStatus))
        {
            contact.Status = contactStatus;
            contact.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }

    public async Task DeleteContactAsync(Guid id)
    {
        var contact = await _context.Contacts.FindAsync(id)
            ?? throw new KeyNotFoundException($"Contact {id} not found");

        _context.Contacts.Remove(contact);
        await _context.SaveChangesAsync();
    }

    private static string BuildSubject(CreateContactDto dto)
    {
        if (!string.IsNullOrWhiteSpace(dto.Subject))
        {
            return dto.Subject.Trim();
        }

        var parts = new[]
        {
            dto.ProjectType?.Trim(),
            dto.Company?.Trim(),
        }
        .Where(part => !string.IsNullOrWhiteSpace(part))
        .ToArray();

        return parts.Length > 0 ? string.Join(" · ", parts) : "Portfolio enquiry";
    }

    private static string BuildMessage(CreateContactDto dto)
    {
        var detailLines = new List<string>
        {
            $"Company: {FormatDetail(dto.Company)}",
            $"Project Type: {FormatDetail(dto.ProjectType)}",
            $"Budget: {FormatDetail(dto.Budget)}",
            $"Timeline: {FormatDetail(dto.Timeline)}",
            string.Empty,
            dto.Message.Trim(),
        };

        return string.Join(Environment.NewLine, detailLines);
    }

    private static string FormatDetail(string? value)
    {
        return string.IsNullOrWhiteSpace(value) ? "Not provided" : value.Trim();
    }

    private static ContactDto MapToDto(Contact contact)
    {
        return new ContactDto
        {
            Id = contact.Id,
            Name = contact.Name,
            Email = contact.Email,
            Subject = contact.Subject,
            Message = contact.Message,
            Status = contact.Status.ToString(),
        };
    }
}
