# Juspay Dashboard

A modern dashboard application built with Next.js, TypeScript, and Tailwind CSS with advanced data management features.

## 🚀 Live Demo

**[View Live Application](https://myselfabhi-juspay-assignment.vercel.app)**

## 👨‍💻 About Me

**Abhinav Verma**

Frontend developer at NPST with past experience at Patent Ninja. I've delivered numerous successful freelancing projects and have a track record of happy clients.

## ✨ Features

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Theme System**: Dynamic dark/light mode with smooth transitions
- **Interactive Charts**: Real-time data visualization with Recharts
- **Advanced Data Management**: Search, filtering, sorting, and pagination
- **Microinteractions**: Smooth animations and hover effects throughout
- **Accessibility**: WCAG compliant with keyboard navigation support
- **Performance**: Optimized with Next.js 16 and modern React patterns

## 🛠 Tech Stack

- **Framework**: Next.js 16.0 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4.0 with custom design tokens
- **UI Components**: Radix UI primitives for accessibility
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Vercel for seamless CI/CD

## 🎨 Design Decisions & Architecture

### **Design System Approach**
I implemented a comprehensive design system using design tokens to ensure consistency across the application:

- **Color System**: Semantic color tokens that adapt to light/dark themes
- **Typography Scale**: Consistent font sizing and spacing using CSS custom properties
- **Component Architecture**: Modular, reusable components with proper TypeScript interfaces
- **Responsive Strategy**: Mobile-first design with progressive enhancement

### **Technical Architecture Choices**

#### **1. Component Structure**
```
components/
├── dashboard/          # Dashboard-specific components
├── ui/                # Reusable UI primitives
└── layout/            # Layout components (Sidebar, Header)
```

**Rationale**: Clear separation of concerns with dashboard components isolated from reusable UI components.

#### **2. State Management**
- **Theme Context**: Custom React context for theme management
- **Local State**: React hooks for component-level state
- **No External State Library**: Kept simple with React's built-in state management

**Rationale**: For a dashboard application, local state and context were sufficient without the complexity of Redux/Zustand.

#### **3. Styling Strategy**
- **Tailwind CSS**: Utility-first approach for rapid development
- **Design Tokens**: Custom CSS variables for consistent theming
- **Component Variants**: Class Variance Authority for component variants

**Rationale**: Tailwind provides excellent developer experience while maintaining design consistency.

### **Challenges Faced & Solutions**

#### **Challenge 1: Responsive Chart Layout**
**Problem**: Charts needed to maintain aspect ratios across different screen sizes while remaining readable.

**Solution**: 
- Implemented responsive container queries
- Used CSS Grid with fractional units for flexible layouts
- Added custom breakpoint utilities for chart-specific responsive behavior

#### **Challenge 2: Theme Consistency**
**Problem**: Ensuring all components properly adapt to light/dark themes without hardcoded colors.

**Solution**:
- Created semantic color tokens that map to theme-specific values
- Implemented a theme context that provides color functions
- Used CSS custom properties for dynamic theme switching

#### **Challenge 3: Performance Optimization**
**Problem**: Large datasets in tables and charts could impact performance.

**Solution**:
- Implemented virtual scrolling for large datasets
- Used React.memo for expensive components
- Lazy loading for non-critical components

### **Accessibility Considerations**
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color combinations
- **Focus Management**: Visible focus indicators and logical tab order

### **Performance Optimizations**
- **Code Splitting**: Route-based code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading
- **Bundle Analysis**: Regular bundle size monitoring
- **Lazy Loading**: Components loaded on demand

## 🎭 Microinteractions & Animations

The application features a comprehensive animation system designed to create delightful user experiences:

### **Animation Library**
I created a custom animation library (`lib/animations.ts`) with:
- **Predefined Animations**: Fade, slide, scale, bounce, and rotation effects
- **Staggered Animations**: Sequential loading for lists and grids
- **Hover Effects**: Scale, lift, glow, and wiggle animations
- **Performance Optimized**: CSS transforms and opacity for 60fps animations
- **Accessibility**: Respects `prefers-reduced-motion` preferences

### **Key Microinteractions**
- **Metric Cards**: Staggered fade-in with animated number counting
- **Sidebar Navigation**: Smooth expand/collapse with glow indicators
- **Chart Loading**: Progressive data visualization with smooth transitions
- **Button Interactions**: Scale and press feedback with spring animations
- **Theme Switching**: Smooth color transitions across all components
- **Hover States**: Subtle lift effects with shadow enhancements
- **Loading States**: Shimmer effects and skeleton screens
- **Focus Management**: Glow effects for keyboard navigation

## 📐 Figma Design Implementation

This project was built to match provided Figma designs with pixel-perfect accuracy:

### **Design Fidelity**
- **Pixel-Perfect Implementation**: Faithful recreation of all design elements
- **Component Mapping**: Each Figma component mapped to reusable React components
- **Typography Matching**: Exact font sizes, weights, and spacing from designs
- **Color Accuracy**: Precise color matching using design tokens
- **Layout Precision**: Exact spacing and positioning using CSS Grid and Flexbox

### **Design System Translation**
- **Figma Tokens → CSS Variables**: Converted design tokens to CSS custom properties
- **Component Variants**: Implemented all design variants and states
- **Responsive Breakpoints**: Maintained design integrity across all screen sizes
- **Interactive States**: Implemented hover, focus, and active states from designs

### **Design Challenges Solved**
- **Complex Layouts**: Multi-column responsive grids with proper alignment
- **Chart Implementations**: Custom chart styling to match design specifications
- **Icon Integration**: Consistent icon usage with proper sizing and alignment
- **Theme Adaptation**: Ensuring designs work perfectly in both light and dark modes

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📝 License

MIT License

## 🔗 Links

- **GitHub**: [@myselfabhi](https://github.com/myselfabhi)
- **Live Demo**: [myselfabhi-juspay-assignment.vercel.app](https://myselfabhi-juspay-assignment.vercel.app)
# juspay_dashboard
