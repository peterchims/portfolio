using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.DTOs;
using PortfolioAPI.Services;

namespace PortfolioAPI.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IContactService contactService, ILogger<ContactController> logger)
    {
        _contactService = contactService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<ContactSubmissionResponseDto>> Submit(
        CreateContactDto dto,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
        var submissionId = await _contactService.SubmitAsync(dto, ipAddress, cancellationToken);

        return Ok(new ContactSubmissionResponseDto
        {
            Ok = true,
            Message = "Project brief received. I'll be in touch shortly.",
            SubmissionId = submissionId,
        });
    }
}
