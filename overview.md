# SkillPath AI - Project Overview

## Architecture
Modern React application with TypeScript, featuring AI-powered learning roadmap generation and resource curation.

## Key Files

### Core Application
- `src/App.tsx`: Main application component with routing
- `src/main.tsx`: Application entry point

### Pages
- `src/pages/home.tsx`: Landing page and main platform interface
- `src/pages/404.tsx`: Error page for invalid routes

### Components
- `src/components/goal-input-form.tsx`: Smart multi-step form for capturing learning goals, skill level, timeframe, and preferences
- `src/components/roadmap-generator.tsx`: AI-powered roadmap creation interface with milestone tracking and resource curation
- `src/components/resource-card.tsx`: Individual learning resource display with ratings, duration, and provider information
- `src/components/progress-tracker.tsx`: Visual progress indicators with streak tracking, achievements, and statistics
- `src/components/skill-selector.tsx`: Interactive skill selection component with search, filtering, and difficulty indicators

### Server Routes (To Be Created)
- `src/server/routes/roadmap.ts`: API for generating personalized learning roadmaps
- `src/server/routes/resources.ts`: API for fetching curated learning resources
- `src/server/routes/progress.ts`: API for tracking user progress

### Styling
- `src/styles/globals.css`: Global styles and design system
- `tailwind.config.ts`: Tailwind configuration with custom design tokens

### Utilities
- `src/lib/utils.ts`: Utility functions
- `src/lib/api.ts`: API client configuration

## Design System
- **Colors**: Professional slate grays with vibrant blue accents
- **Typography**: Inter font for clean readability
- **Components**: shadcn/ui for consistent, accessible components
- **Animations**: Subtle framer-motion transitions for enhanced UX