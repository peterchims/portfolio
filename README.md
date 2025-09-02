<<<<<<< HEAD
# Professional Portfolio Website

A stunning, fully responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features beautiful animations, professional design, and Docker containerization for easy deployment.

## 🚀 Features

- **Modern Design**: Clean, professional layout with sophisticated color system
- **Responsive**: Optimized for all devices and screen sizes
- **Animated**: Smooth animations and micro-interactions
- **Professional**: Perfect for job applications and client presentations
- **Type-Safe**: Built with TypeScript for reliability
- **Containerized**: Docker setup for easy deployment

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Fonts**: Roboto, Raleway
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Containerization**: Docker & Docker Compose

## 📦 Installation

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Docker Development

```bash
# Run in development mode
docker-compose --profile dev up --build

# Run in production mode
docker-compose up --build
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── CustomButton.tsx
│   │   └── CustomText.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/           # Page sections
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── SkillsSection.tsx
│       ├── ProjectsSection.tsx
│       └── ContactSection.tsx
├── styles/
│   └── globals.css         # Global styles and CSS variables
├── App.tsx                 # Main app component
└── main.tsx               # Entry point
```

## 🎨 Design System

### Colors
- **Primary**: Dark greens and lime accents
- **Secondary**: Professional grays
- **Accent**: Bright lime green
- **Background**: Subtle gradients

### Typography
- **Headings**: Roboto (Clean, modern)
- **Body**: Raleway (Readable, elegant)
- **Weights**: Light to Bold variants

### Components
- **CustomButton**: Multiple variants with animations
- **CustomText**: Flexible typography component
- **Responsive**: Mobile-first approach

## 🚀 Deployment

### Docker Production

```bash
# Build and run production container
docker build -t portfolio .
docker run -p 3000:80 portfolio
```

### Using Docker Compose

```bash
# Production deployment
docker-compose up -d
```

Access your portfolio at `http://localhost:3000`

## 📝 Customization

1. **Personal Information**: Update content in each section component
2. **Projects**: Modify the projects array in `ProjectsSection.tsx`
3. **Skills**: Update skill categories in `SkillsSection.tsx`
4. **Colors**: Adjust CSS variables in `globals.css`
5. **Fonts**: Change font imports and classes as needed

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Features to Highlight

- Beautiful hero section with floating animations
- Interactive skills visualization
- Project showcase with hover effects
- Professional contact form
- Smooth scrolling navigation
- Mobile-responsive design
- Docker containerization
- Production-ready optimization

Perfect for developers looking to make a strong impression with potential employers or clients!
=======
# portfolio
Personal portfolio showcasing my projects, skills, and professional experience in web development, and technical solutions.
>>>>>>> 81a76254315bc2b72f130d759973c741dc7fa221
