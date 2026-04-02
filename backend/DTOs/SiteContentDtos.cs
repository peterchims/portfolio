namespace PortfolioAPI.DTOs;

public class SitePayloadDto
{
    public PortfolioSiteContentDto Data { get; set; } = new();
    public SiteMetaDto Meta { get; set; } = new();
}

public class SiteMetaDto
{
    public string UpdatedAt { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
}

public class PortfolioSiteContentDto
{
    public LoaderContentDto Loader { get; set; } = new();
    public List<NavigationItemDto> SiteNavigation { get; set; } = new();
    public PortfolioProfileDto Profile { get; set; } = new();
    public HeroContentDto Hero { get; set; } = new();
    public PortfolioSectionsDto Sections { get; set; } = new();
    public ProjectShowcaseDto ProjectShowcase { get; set; } = new();
    public ContactFormDto ContactForm { get; set; } = new();
    public FooterContentDto Footer { get; set; } = new();
    public List<HeroMetricDto> HeroMetrics { get; set; } = new();
    public List<SocialLinkDto> SocialLinks { get; set; } = new();
    public List<ServicePillarDto> ServicePillars { get; set; } = new();
    public List<FeaturedProjectContentDto> FeaturedProjects { get; set; } = new();
    public List<FeaturedProjectContentDto> UpcomingProjects { get; set; } = new();
    public List<StackGroupDto> StackGroups { get; set; } = new();
    public List<ProcessStepDto> ProcessSteps { get; set; } = new();
    public List<SystemSignalDto> SystemSignals { get; set; } = new();
}

public class LoaderContentDto
{
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
}

public class NavigationItemDto
{
    public string Id { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
}

public class PortfolioProfileDto
{
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Availability { get; set; } = string.Empty;
    public string ResumeUrl { get; set; } = string.Empty;
}

public class HeroContentDto
{
    public string Eyebrow { get; set; } = string.Empty;
    public string PanelEyebrow { get; set; } = string.Empty;
    public string PanelTitle { get; set; } = string.Empty;
    public ContentModeLabelsDto ModeLabels { get; set; } = new();
    public CallToActionDto HeaderCta { get; set; } = new();
    public CallToActionDto PrimaryCta { get; set; } = new();
    public CallToActionDto SecondaryCta { get; set; } = new();
}

public class ContentModeLabelsDto
{
    public string Api { get; set; } = string.Empty;
    public string Fallback { get; set; } = string.Empty;
}

public class CallToActionDto
{
    public string Label { get; set; } = string.Empty;
    public string Href { get; set; } = string.Empty;
}

public class PortfolioSectionsDto
{
    public SectionContentDto Services { get; set; } = new();
    public SectionContentDto Projects { get; set; } = new();
    public SectionContentDto Process { get; set; } = new();
    public SectionContentDto Contact { get; set; } = new();
}

public class SectionContentDto
{
    public string Kicker { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Copy { get; set; } = string.Empty;
}

public class ProjectShowcaseDto
{
    public string RecentLabel { get; set; } = string.Empty;
    public string UpcomingLabel { get; set; } = string.Empty;
    public string HighlightsLabel { get; set; } = string.Empty;
    public string MetricsLabel { get; set; } = string.Empty;
    public string StackLabel { get; set; } = string.Empty;
    public string LiveLabel { get; set; } = string.Empty;
    public string SourceLabel { get; set; } = string.Empty;
    public string PrivateLabel { get; set; } = string.Empty;
    public string ShareLabel { get; set; } = string.Empty;
    public string ShareSuccessLabel { get; set; } = string.Empty;
    public string ShareErrorLabel { get; set; } = string.Empty;
}

public class ContactFormDto
{
    public string DetailsLabel { get; set; } = string.Empty;
    public string HelperText { get; set; } = string.Empty;
    public string SubmitLabel { get; set; } = string.Empty;
    public string SubmittingLabel { get; set; } = string.Empty;
    public ContactFormFieldsDto Fields { get; set; } = new();
}

public class ContactFormFieldsDto
{
    public ContactFieldDto Name { get; set; } = new();
    public ContactFieldDto Email { get; set; } = new();
    public ContactFieldDto Company { get; set; } = new();
    public ContactSelectFieldDto ProjectType { get; set; } = new();
    public ContactSelectFieldDto Budget { get; set; } = new();
    public ContactSelectFieldDto Timeline { get; set; } = new();
    public ContactFieldDto Message { get; set; } = new();
}

public class ContactFieldDto
{
    public string Label { get; set; } = string.Empty;
    public string Placeholder { get; set; } = string.Empty;
}

public class ContactSelectFieldDto : ContactFieldDto
{
    public List<SelectOptionDto> Options { get; set; } = new();
}

public class SelectOptionDto
{
    public string Value { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
}

public class FooterContentDto
{
    public string Tagline { get; set; } = string.Empty;
}

public class HeroMetricDto
{
    public string Value { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
}

public class SocialLinkDto
{
    public string Label { get; set; } = string.Empty;
    public string Href { get; set; } = string.Empty;
    public string Handle { get; set; } = string.Empty;
}

public class ServicePillarDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Bullets { get; set; } = new();
}

public class FeaturedProjectContentDto
{
    public string Title { get; set; } = string.Empty;
    public string Year { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string Summary { get; set; } = string.Empty;
    public string Impact { get; set; } = string.Empty;
    public string Spotlight { get; set; } = string.Empty;
    public List<string> Highlights { get; set; } = new();
    public List<ProjectMetricContentDto> Metrics { get; set; } = new();
    public List<string> Stack { get; set; } = new();
    public string? LiveUrl { get; set; }
    public string? CodeUrl { get; set; }
}

public class ProjectMetricContentDto
{
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public class StackGroupDto
{
    public string Title { get; set; } = string.Empty;
    public List<string> Items { get; set; } = new();
}

public class ProcessStepDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class SystemSignalDto
{
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
    public string Tone { get; set; } = string.Empty;
}
