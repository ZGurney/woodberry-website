# Woodberry Down Community Website - Technical Migration Plan

## Project Overview
**Objective**: Migrate from Wix to self-hosted static site with easy content management  
**Timeline**: 2-3 weeks  
**Budget**: £0/month (using free tiers)  
**Team**: 1 developer + up to 5 content editors  

## Architecture Decision
- **Frontend**: Next.js (Static Site Generation)
- **CMS**: Strapi Cloud (Free tier)
- **Styling**: Tailwind CSS
- **Hosting**: Netlify
- **Forms**: Netlify Forms
- **Domain**: Existing domain (to be pointed after testing)

## Strapi Cloud Free Tier Specifications
- **Database Entries**: 500 entries
- **API Requests**: 10,000/month
- **Asset Storage**: 10GB
- **Asset Bandwidth**: 10GB/month
- **Environments**: 1 included
- **Limitations**: No backups, no custom domain, no SLA, community support only
- **Sufficient for**: Twice-yearly content updates, low traffic volume

## Website Structure
```
Home
├── Programmes (dropdown)
│   ├── Children's Classes
│   ├── Junior Youth Groups
│   ├── Community Leaders Programme
│   ├── Camps
│   └── Devotional Gatherings
├── About
├── Camp Registration (external link)
└── Calendar
```

---

## Implementation Phases

### Phase 1: Project Setup & Foundation
- [x] Initialize Next.js project with TypeScript
- [x] Configure Tailwind CSS with custom theme
- [x] Set up project structure (components, pages, styles, utils)
- [x] Install dependencies (axios for API calls, lucide-react for icons)
- [x] Configure TypeScript types for Strapi API
- [x] Create API client utilities for Strapi integration
- [x] Set up environment variables configuration
- [x] Create Header component with dropdown navigation
- [x] Create basic layout structure (Header + Footer)
- [x] Configure ESLint, Prettier, and basic CI/CD
- [x] Reorganize project structure (moved from woodberry-site/ to root)
- [ ] Create GitHub repository and initial commit

**Learnings/Notes:**
- **Strapi SDK Issue**: The `@strapi/sdk` package doesn't exist - use standard axios HTTP client instead
- **API Integration**: Created custom API client in `/src/lib/strapi.ts` with full TypeScript support
- **Project Structure Reorganized**: Moved all files from `/woodberry-site/` to root level for cleaner structure
- **Dependencies Installed**: axios (HTTP client), lucide-react (icons), tailwindcss configured
- **Types Created**: Full TypeScript interfaces in `/src/types/strapi.ts` for all content types
- **Environment Setup**: `.env.local` configured for Strapi Cloud integration (tokens pending)
- **Components Created**: Header with dropdown navigation, Footer with contact info and links
- **Archive Created**: Moved unused files to `/archive/` folder for future reference
- **Build Working**: Next.js builds successfully with proper linting and TypeScript support 

### Phase 2: Strapi CMS Setup (Free Tier Strategy)
- [ ] Create Strapi Cloud account (free tier)
- [ ] Design content model for 500 entries limit:
  - [ ] **Collection Type**: `pages` (Home, About, Calendar - ~3 entries)
  - [ ] **Collection Type**: `programmes` (5 programme types - ~5 entries)
  - [ ] **Single Type**: `site-settings` (global config - 1 entry)
  - [ ] **Collection Type**: `navigation` (menu structure - ~10 entries)
- [ ] Set up user roles and permissions
- [ ] Configure API permissions for public access
- [ ] Test content creation and API responses (well within 500 entry limit)

**Learnings/Notes:**
- 
- 

### Phase 3: Content Migration & Data Preparation
- [ ] Structure existing content into Strapi schema
- [ ] Create content entries for all pages:
  - [ ] Home page content
  - [ ] About page FAQ content
  - [ ] Calendar placeholder content
- [ ] Create programme entries:
  - [ ] Children's Classes (ages 5-10)
  - [ ] Junior Youth Groups (ages 11-15)
  - [ ] Community Leaders Programme (ages 15+)
  - [ ] Camps (residential training)
  - [ ] Devotional Gatherings (interfaith)
- [ ] Download and optimize images from current site (within 10GB limit)
- [ ] Upload images to Strapi Media Library
- [ ] Configure navigation structure with dropdown
- [ ] Set up external links (camp registration: bahaievents.org.uk)
- [ ] Configure contact information and social media links

**Learnings/Notes:**
- 
- 

### Phase 4: Next.js Frontend Development
- [ ] Create page layouts and reusable components:
  - [ ] Header with dropdown navigation
  - [ ] Footer with contact info and social links
  - [ ] Hero section component
  - [ ] Programme card component
  - [ ] Content blocks component
- [ ] Implement Strapi API integration:
  - [ ] Set up API client and types
  - [ ] Create data fetching utilities
  - [ ] Implement static generation for all pages
  - [ ] Handle 10,000 API requests/month limit with static generation
- [ ] Build responsive design with Tailwind CSS:
  - [ ] Mobile-first approach with dropdown menu
  - [ ] Desktop layout optimization
  - [ ] Accessible color scheme and typography
- [ ] Add image optimization and lazy loading
- [ ] Implement basic SEO (meta tags, structured data)

**Learnings/Notes:**
- 
- 

### Phase 5: Forms & User Interaction
- [ ] Set up Netlify Forms for contact form
- [ ] Create contact form component with validation
- [ ] Configure form submission handling
- [ ] Set up email notifications for form submissions
- [ ] Test form functionality and spam protection
- [ ] Add form success/error states

**Learnings/Notes:**
- 
- 

### Phase 6: Performance & SEO Optimization
- [ ] Configure Next.js for optimal static generation
- [ ] Implement image optimization and WebP conversion
- [ ] Add proper meta tags and Open Graph data
- [ ] Generate sitemap and robots.txt
- [ ] Test Core Web Vitals and performance metrics
- [ ] Optimize for 10GB/month bandwidth limit

**Learnings/Notes:**
- 
- 

### Phase 7: CMS User Experience Setup
- [ ] Create content editor accounts in Strapi
- [ ] Configure user permissions and roles
- [ ] Test content editing workflows
- [ ] Create simple content editing guide
- [ ] Document common tasks (updating text, changing images)
- [ ] Test publishing and live site updates

**Learnings/Notes:**
- 
- 

### Phase 8: Testing & Quality Assurance
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile device testing (iOS, Android)
- [ ] Dropdown navigation testing across devices
- [ ] Content editing testing with non-technical users
- [ ] Form submission testing across devices
- [ ] Performance testing on slow connections
- [ ] Basic accessibility testing (keyboard navigation, screen readers)
- [ ] Link checking and content validation

**Learnings/Notes:**
- 
- 

### Phase 9: Deployment & Preview
- [ ] Set up Netlify deployment from GitHub
- [ ] Configure build settings and environment variables
- [ ] Set up preview domain for testing
- [ ] Test automated deployments from CMS updates
- [ ] Configure SSL certificate on preview domain
- [ ] Final content review and approval

**Learnings/Notes:**
- 
- 

### Phase 10: Documentation & Handover Preparation
- [ ] Create comprehensive content editor guide
- [ ] Document technical setup and architecture
- [ ] Prepare admin credentials and access information
- [ ] Create troubleshooting guide for common issues
- [ ] Document future maintenance requirements
- [ ] Prepare domain switching instructions

**Learnings/Notes:**
- 
- 

---

## Final Steps (User-Handled)
- [ ] **Domain DNS Update**: Point existing domain to Netlify
- [ ] **Image Replacement**: Update photos with new community images
- [ ] **Content Review**: Final content updates and corrections
- [ ] **User Training**: Brief content editors on CMS usage

---

## Technical Specifications

### Content Model Design

#### Collection Type: `pages`
```json
{
  "title": "Text",
  "slug": "Text (unique)",
  "content": "Rich Text",
  "hero_image": "Media",
  "meta_description": "Text"
}
```

#### Collection Type: `programmes`
```json
{
  "title": "Text",
  "slug": "Text (unique)",
  "age_range": "Text",
  "description": "Rich Text",
  "key_features": "JSON (array of bullet points)",
  "registration_link": "Text",
  "sample_materials_link": "Text",
  "images": "Media (multiple)",
  "testimonials": "JSON (array of quotes)",
  "order": "Number (for menu ordering)"
}
```

#### Single Type: `site-settings`
```json
{
  "site_title": "Text",
  "contact_email": "Email",
  "contact_phone": "Text",
  "address": "Text",
  "social_facebook": "Text",
  "social_twitter": "Text",
  "social_linkedin": "Text",
  "camp_registration_url": "Text",
  "hero_quote": "Text"
}
```

#### Collection Type: `navigation`
```json
{
  "title": "Text",
  "url": "Text",
  "parent": "Relation (self)",
  "order": "Number",
  "external": "Boolean"
}
```

### Resource Usage Estimates
- **Entries**: ~20 total (well under 500 limit)
- **API Requests**: ~100/month (well under 10,000 limit)
- **Storage**: ~2GB for images (well under 10GB limit)
- **Bandwidth**: ~1GB/month (well under 10GB limit)

### API Endpoints
- `GET /api/pages` - All pages
- `GET /api/pages/:slug` - Single page
- `GET /api/programmes` - All programmes
- `GET /api/programmes/:slug` - Single programme
- `GET /api/site-setting` - Global settings
- `GET /api/navigations` - Menu structure

### Environment Variables
- `STRAPI_API_URL` - Strapi API endpoint
- `STRAPI_API_TOKEN` - API access token
- `NETLIFY_SITE_ID` - Netlify site identifier

---

## Risk Mitigation Strategies

### Free Tier Limitations
- **Entry Limit**: Well under 500 entries needed
- **API Requests**: Static generation minimizes API calls
- **Storage**: Optimize images, current usage ~2GB
- **Bandwidth**: Low traffic site, well under limits
- **No Backups**: Manual content export before major changes
- **No Custom Domain**: Use Strapi subdomain for CMS

### Technical Risks
- **Strapi Changes**: Pin to specific version, document setup
- **Netlify Limits**: Monitor bandwidth and build minutes
- **Performance**: Optimize images and implement lazy loading
- **SEO**: Proper meta tags and structured data
- **Cold Start**: Acceptable for low-traffic CMS usage

---

## Success Metrics
- [ ] **Performance**: Page load < 3 seconds
- [ ] **Accessibility**: Basic WCAG compliance
- [ ] **SEO**: Proper meta tags and sitemap
- [ ] **Usability**: Non-technical users can edit content
- [ ] **Reliability**: 99.9% uptime on Netlify
- [ ] **Cost**: £0/month operational cost
- [ ] **Navigation**: Dropdown menu works on all devices

---

## Post-Launch Considerations
- **Monitoring**: Set up basic uptime monitoring
- **Updates**: Document update process for Next.js and dependencies
- **Scaling**: Plan for paid Strapi tier if content grows significantly
- **Analytics**: Consider adding simple analytics if needed
- **Backup**: Implement manual backup process for critical content
- **Resource Monitoring**: Track API requests and bandwidth usage

---

## Project Notes & Decisions

### Key Decisions Made
1. **Strapi Cloud Free Tier**: Generous limits sufficient for project needs
2. **Multiple Content Types**: Can use several types within 500 entry limit
3. **Current Images**: Keep existing images for initial launch
4. **Simple Approach**: KISS principle throughout development
5. **Dropdown Navigation**: Essential for programme structure

### Navigation Structure
- **Top Level**: Home, Programmes, About, Camp Registration, Calendar
- **Programmes Dropdown**: 5 sub-items (Children's Classes, Junior Youth Groups, Community Leaders Programme, Camps, Devotional Gatherings)
- **External Link**: Camp Registration points to bahaievents.org.uk

### Important Links
- **Current Site**: https://www.wbdcommunity.com
- **Content Extraction**: `website-content.json`
- **Registration Forms**: Google Forms (maintain existing)
- **Camp Registration**: bahaievents.org.uk (external link)

### Contact Information
- **Email**: hackney.jyesep@gmail.com
- **Phone**: 07576502702
- **Location**: Woodberry Down, London N4, UK

---

## Progress Tracking
**Started**: June 22, 2025  
**Current Phase**: Phase 1 - Project Setup (95% complete)  
**Completion**: 0/10 phases complete  

**Overall Progress**: ⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜ 9.5%

## Implementation Progress Update
**Last Updated**: June 22, 2025

### Current Status
- **Phase 1** is 95% complete - Full Next.js project with TypeScript, Tailwind, Header/Footer components, and clean structure
- **Next Steps**: Create GitHub repository, then proceed to Phase 2 (Strapi Cloud setup)
- **Key Files Created**:
  - `/src/types/strapi.ts` - TypeScript interfaces for all content types
  - `/src/lib/strapi.ts` - API client with full CRUD operations
  - `/src/components/Header.tsx` - Responsive header with dropdown navigation
  - `/src/components/Footer.tsx` - Footer with contact info and program links
  - `/.env.local` - Environment configuration (tokens pending)
  - `/package.json` - Dependencies: Next.js, TypeScript, Tailwind, axios, lucide-react
  - `/archive/` - Previous files preserved for future reference

### Ready for New Session
**Project Organization Complete**: All files properly organized at root level, build working perfectly, and ready for Phase 2 (Strapi Cloud setup). The foundation is solid with responsive Header/Footer components and clean codebase structure.