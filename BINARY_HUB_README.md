# Binary Hub - IT Training & Freelance Platform

A beautiful, iOS-inspired web application built for Binary Hub - a premier IT training and freelance development company in Pakistan.

## 🎨 Design Features

- **iOS-like Frosted Glass UI**: Backdrop blur effects, soft gradients, and elegant rounded corners
- **Brand Colors**: Orange (#ec712b) and Blue (#005797) with smooth gradients
- **Smooth Animations**: Framer Motion for spring-based, accessible animations
- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Accessibility**: Keyboard navigation, ARIA labels, semantic HTML
- **Dark Theme**: Professional dark background with high contrast

## 🚀 Technologies Used

- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **React Router** for client-side routing
- **shadcn/ui** for accessible UI components
- **Lucide React** for icons

## 📁 Project Structure

```
src/
├── assets/              # Images and static assets
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Animated hero section
│   ├── AppSidebar.tsx  # Sidebar navigation
│   ├── CourseCard.tsx  # Course display cards
│   ├── MentorCard.tsx  # Mentor profile cards
│   ├── AnimatedCounter.tsx  # Animated statistics
│   └── TestimonialCarousel.tsx  # Auto-rotating testimonials
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── BinaryHub.tsx   # Company overview
│   ├── BinaryHubTeam.tsx  # Team members
│   ├── BinaryHubGallery.tsx  # Gallery with filters
│   ├── DigitalServicesCourses.tsx  # Courses listing
│   ├── DigitalServicesServices.tsx  # Freelance services
│   ├── DigitalServicesInternships.tsx  # Internship programs
│   ├── EnrollCourse.tsx  # Enrollment form
│   └── Consultancy.tsx  # Consultancy placeholder
├── data/
│   └── seed.json       # All application data
└── App.tsx             # Main app with routing
```

## 🌟 Key Features

### Pages & Routes

1. **Home (`/`)**: Hero section, chairman vision, achievements counter, branches, projects, testimonials
2. **Binary Hub (`/binary-hub`)**: Company overview with sidebar navigation
3. **Our Team (`/binary-hub/team`)**: Mentor profiles with LinkedIn links
4. **Gallery (`/binary-hub/gallery`)**: Filterable gallery with lightbox
5. **Courses (`/digital-services/courses`)**: Course cards with enrollment CTAs
6. **Services (`/digital-services/services`)**: Freelancer profiles by category
7. **Internships (`/digital-services/internships`)**: Program details with availability status
8. **Enroll (`/digital-services/enroll/:courseSlug`)**: Full enrollment form with validation
9. **Consultancy (`/consultancy`)**: Placeholder page for enterprise services

### Components

- **Hero**: Animated background with frosted glass card and 3 CTA buttons
- **Sidebar**: Context-aware navigation (Binary Hub vs Digital Services)
- **Course Cards**: Hover animations, duration, price, enroll buttons
- **Mentor Cards**: Photos, titles, LinkedIn buttons (open in new tab)
- **Animated Counters**: Count-up animation when scrolled into view
- **Testimonial Carousel**: Auto-rotating with pause-on-hover, keyboard accessible
- **Gallery**: Category filtering with smooth grid animations and lightbox

### Forms & Validation

The enrollment form includes:
- Client-side validation (React state)
- Required fields: name (min 3 chars), email, branch, consent checkbox
- Optional fields: phone (pattern validation), message, resume upload
- File upload: PDF only, max 5MB, with progress feedback
- Success state with celebration animation
- Error handling with inline error messages

## 🎨 Design System

### Color Tokens (HSL in `index.css`)

```css
--brand-orange: 20 79% 54%;       /* Primary CTA color */
--brand-blue: 203 100% 30%;       /* Secondary CTA color */
--gradient-primary: linear-gradient(135deg, orange → blue);
--gradient-soft: Same gradient at 12% opacity for backgrounds
```

### Utility Classes

- `.glass-card`: Frosted glass effect with backdrop blur
- `.gradient-text`: Orange-to-blue gradient text
- `.frosted`: Alternative frosted background
- Custom shadows: `shadow-soft-ios`, `shadow-glow`

### Animations

- Page transitions: Fade + slide on mount
- Button press: Scale to 0.98 with spring physics
- Card hover: Lift with -4px to -8px translateY
- Counters: Animate from 0 to target value on scroll
- Carousel: Slide transitions with smooth easing
- Lightbox: Scale + fade modal

## 📊 Data Structure

All data lives in `src/data/seed.json`:

- **Company**: Name, motto, chairman info
- **Branches**: 3 locations with address/phone
- **Achievements**: 3 statistics (students, projects, freelancers)
- **Projects**: 4 featured projects
- **Testimonials**: 3 student/client testimonials
- **Courses**: 6 courses (Web Dev, UI/UX, Graphic Design, etc.)
- **Mentors**: 4 mentors with LinkedIn profiles
- **Services**: Freelancer categories and profiles
- **Gallery**: 8 items across 5 categories
- **Internships**: 2 programs with currentOpenings flag

## 🔧 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 SEO Optimization

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`)
- Meta tags in `index.html` (title, description, keywords, Open Graph)
- Descriptive alt attributes on all images
- Friendly URLs matching page structure
- Mobile-responsive with proper viewport meta tag

## ♿ Accessibility Features

- Keyboard navigation throughout
- ARIA labels on interactive elements
- Focus visible rings on all focusable elements
- Proper heading hierarchy (h1 → h2 → h3)
- High contrast text (tested for WCAG compliance)
- `prefers-reduced-motion` respected in animations
- External links open in new tab with `noopener,noreferrer`

## 🚀 Future Enhancements (TODOs)

### Backend Integration (when needed)

Currently uses static JSON data. To add persistence:

1. **Enable Lovable Cloud** or connect external backend
2. Replace `seedData` imports with API calls:
   - `GET /api/courses` - Fetch courses
   - `GET /api/mentors` - Fetch mentors
   - `POST /api/enroll` - Submit enrollment
   - `GET /api/internships` - Check current openings
3. Add file upload to cloud storage (resume handling)
4. Email notifications on enrollment
5. Admin panel to manage courses/mentors/gallery

### Additional Features

- [ ] Blog/News section for company updates
- [ ] Student portal with course progress tracking
- [ ] Live chat support widget
- [ ] Course filtering and search
- [ ] Alumni success stories section
- [ ] Downloadable course brochures
- [ ] Payment gateway integration
- [ ] Multi-language support (Urdu/English)
- [ ] Advanced analytics tracking

## 📝 Motion & Animation Notes

All animations use:
- **Framer Motion** for declarative animations
- **Spring physics** for natural feel (not linear easing)
- **Stagger delays** for sequential reveals
- **Viewport triggers** for scroll animations
- **Reduced motion** support via `prefers-reduced-motion`

Motion can be further customized in individual components or disabled globally by modifying Framer Motion's `MotionConfig`.

## 🎯 Brand Guidelines

- Primary CTA: Orange buttons for main actions (Enroll, Apply)
- Secondary CTA: Blue buttons for navigation/info
- Outline buttons: For tertiary actions
- Always use gradient text for major headings
- Frosted cards for content containers
- Ample spacing (p-8, p-12 on cards)
- Rounded corners: 2xl/3xl (1.5rem)

## 📧 Contact Information

- **Email**: info@binaryhub.pk, consultancy@binaryhub.pk
- **Karachi**: +92-21-3586-2100
- **Lahore**: +92-42-3587-4200
- **Islamabad**: +92-51-2277-900

---

**Built with ❤️ using Lovable** - Modern web development made simple.
