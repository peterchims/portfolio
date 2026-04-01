using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.DTOs;
using PortfolioAPI.Services;

namespace PortfolioAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(IProjectService projectService, ILogger<ProjectsController> logger)
    {
        _projectService = projectService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProjectDto>>> GetAll()
    {
        var projects = await _projectService.GetAllProjectsAsync();
        return Ok(projects);
    }

    [HttpGet("featured")]
    public async Task<ActionResult<List<ProjectDto>>> GetFeatured()
    {
        var projects = await _projectService.GetFeaturedProjectsAsync();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto>> GetById(Guid id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    [HttpPost]
    public async Task<ActionResult<ProjectDto>> Create(CreateProjectDto dto)
    {
        var project = await _projectService.CreateProjectAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ProjectDto>> Update(Guid id, CreateProjectDto dto)
    {
        var project = await _projectService.UpdateProjectAsync(id, dto);
        return Ok(project);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _projectService.DeleteProjectAsync(id);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly IBlogService _blogService;

    public BlogController(IBlogService blogService)
    {
        _blogService = blogService;
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetPosts(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? category = null)
    {
        var (posts, total) = await _blogService.GetBlogPostsAsync(page, pageSize, category);
        return Ok(new
        {
            posts,
            pagination = new
            {
                total,
                page,
                pageSize,
                pages = (int)Math.Ceiling((double)total / pageSize),
            },
        });
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<BlogPostDto>> GetBySlug(string slug)
    {
        var post = await _blogService.GetPostBySlugAsync(slug);
        if (post == null)
        {
            return NotFound();
        }

        return Ok(post);
    }

    [HttpPost]
    public async Task<ActionResult<BlogPostDto>> Create(CreateBlogPostDto dto)
    {
        var post = await _blogService.CreatePostAsync(dto);
        return CreatedAtAction(nameof(GetBySlug), new { slug = post.Slug }, post);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BlogPostDto>> Update(Guid id, CreateBlogPostDto dto)
    {
        var post = await _blogService.UpdatePostAsync(id, dto);
        return Ok(post);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _blogService.DeletePostAsync(id);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ContactController(IContactService contactService, IHttpContextAccessor httpContextAccessor)
    {
        _contactService = contactService;
        _httpContextAccessor = httpContextAccessor;
    }

    [HttpPost]
    public async Task<ActionResult<ContactSubmissionResponseDto>> Submit(CreateContactDto dto)
    {
        var ipAddress = _httpContextAccessor.HttpContext?.Connection.RemoteIpAddress?.ToString();
        var contact = await _contactService.SubmitContactAsync(dto, ipAddress);

        return Ok(new ContactSubmissionResponseDto
        {
            Ok = true,
            Message = "Project brief received.",
            SubmissionId = contact.Id.ToString(),
        });
    }

    [HttpGet]
    public async Task<ActionResult<List<ContactDto>>> GetAll()
    {
        var contacts = await _contactService.GetAllContactsAsync();
        return Ok(contacts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ContactDto>> GetById(Guid id)
    {
        var contact = await _contactService.GetContactByIdAsync(id);
        if (contact == null)
        {
            return NotFound();
        }

        return Ok(contact);
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] string status)
    {
        await _contactService.UpdateContactStatusAsync(id, status);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _contactService.DeleteContactAsync(id);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly ITestimonialService _testimonialService;

    public TestimonialsController(ITestimonialService testimonialService)
    {
        _testimonialService = testimonialService;
    }

    [HttpGet("approved")]
    public async Task<ActionResult<List<TestimonialDto>>> GetApproved()
    {
        var testimonials = await _testimonialService.GetApprovedTestimonialsAsync();
        return Ok(testimonials);
    }

    [HttpGet]
    public async Task<ActionResult<List<TestimonialDto>>> GetAll()
    {
        var testimonials = await _testimonialService.GetAllTestimonialsAsync();
        return Ok(testimonials);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TestimonialDto>> GetById(Guid id)
    {
        var testimonial = await _testimonialService.GetTestimonialByIdAsync(id);
        if (testimonial == null)
        {
            return NotFound();
        }

        return Ok(testimonial);
    }

    [HttpPost]
    public async Task<ActionResult<TestimonialDto>> Create(CreateTestimonialDto dto)
    {
        var testimonial = await _testimonialService.CreateTestimonialAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = testimonial.Id }, testimonial);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TestimonialDto>> Update(Guid id, CreateTestimonialDto dto)
    {
        var testimonial = await _testimonialService.UpdateTestimonialAsync(id, dto);
        return Ok(testimonial);
    }

    [HttpPatch("{id}/approve")]
    public async Task<IActionResult> Approve(Guid id)
    {
        await _testimonialService.ApproveTestimonialAsync(id);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _testimonialService.DeleteTestimonialAsync(id);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly ISkillService _skillService;

    public SkillsController(ISkillService skillService)
    {
        _skillService = skillService;
    }

    [HttpGet]
    public async Task<ActionResult<List<SkillDto>>> GetAll()
    {
        var skills = await _skillService.GetAllSkillsAsync();
        return Ok(skills);
    }

    [HttpGet("grouped")]
    public async Task<ActionResult<object>> GetGrouped()
    {
        var grouped = await _skillService.GetSkillsByCategoryAsync();
        var result = grouped.Select(g => new { category = g.Category, skills = g.Skills });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SkillDto>> GetById(Guid id)
    {
        var skill = await _skillService.GetSkillByIdAsync(id);
        if (skill == null)
        {
            return NotFound();
        }

        return Ok(skill);
    }

    [HttpPost]
    public async Task<ActionResult<SkillDto>> Create(CreateSkillDto dto)
    {
        var skill = await _skillService.CreateSkillAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = skill.Id }, skill);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<SkillDto>> Update(Guid id, CreateSkillDto dto)
    {
        var skill = await _skillService.UpdateSkillAsync(id, dto);
        return Ok(skill);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _skillService.DeleteSkillAsync(id);
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;
    private readonly ILogger<ChatController> _logger;

    public ChatController(IChatService chatService, ILogger<ChatController> logger)
    {
        _chatService = chatService;
        _logger = logger;
    }

    [HttpPost("start")]
    public async Task<ActionResult<ChatConversationDto>> StartConversation(StartConversationDto dto)
    {
        var conversation = await _chatService.StartConversationAsync(dto);
        return CreatedAtAction(nameof(GetConversation), new { id = conversation.Id }, conversation);
    }

    [HttpPost("message")]
    public async Task<ActionResult<ChatConversationDto>> SendMessage(SendMessageDto dto)
    {
        var conversation = await _chatService.SendMessageAsync(dto);
        return Ok(conversation);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ChatConversationDto>> GetConversation(Guid id)
    {
        var conversation = await _chatService.GetConversationAsync(id);
        if (conversation == null)
            return NotFound();
        return Ok(conversation);
    }

    [HttpGet]
    public async Task<ActionResult<List<ChatConversationDto>>> GetAll()
    {
        var conversations = await _chatService.GetAllConversationsAsync();
        return Ok(conversations);
    }

    [HttpPost("response")]
    public async Task<ActionResult<ChatMessageDto>> GetAutomatedResponse([FromBody] string message)
    {
        var response = await _chatService.GetAutomatedResponseAsync(message);
        return Ok(response);
    }
}
