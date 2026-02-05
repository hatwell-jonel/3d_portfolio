# AGENTS.md - Development Guide for 3D Portfolio

This guide contains essential information for AI agents working on this 3D portfolio project built with Next.js 16, React 19, and Three.js.

## Development Commands

### Core Commands
```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint (Next.js config with core-web-vitals + typescript)
```

### Testing
- No test framework currently configured
- Use `pnpm dev` for manual testing
- Test 3D interactions by navigating the room with WASD + mouse drag
- Verify responsive behavior at different viewport sizes

## Project Architecture

### Tech Stack
- **Framework**: Next.js 16.0.10 with App Router
- **Frontend**: React 19.2.0 with TypeScript
- **3D**: Three.js + @react-three/fiber + @react-three/drei
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **State**: React hooks only (no external state manager)
- **Theme**: next-themes for dark/light mode
- **Package Manager**: pnpm

### File Structure
```
src/
├── app/                    # Next.js app router
│   ├── 3d/                 # 3D portfolio scene
│   │   ├── models/         # 3D model components
│   │   ├── scenes/         # 3D scene components  
│   │   └── arcade/         # Game components
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── features/           # Feature-specific components
│   ├── ui/                 # Reusable UI (shadcn/ui)
│   └── theme-provider.tsx  # Theme context
├── lib/
│   ├── utils.ts            # cn() utility (tailwind-merge + clsx)
│   └── data.tsx            # App data/config
└── types/
    └── global.d.ts         # Global type definitions
```

## Code Style Guidelines

### General Principles
- Functional components with TypeScript interfaces
- Server components for static content, client components for interactivity
- Use 'use client' directive for Three.js and interactive components
- Forward refs for UI components
- Class Variance Authority (CVA) for component variants

### Import Patterns
```typescript
// External libraries first
import * as React from "react"
import * as THREE from 'three'

// Internal imports use @/* path aliases
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArcadeGame } from '@/components/features/ArcadeGames'
```

### Naming Conventions
- **Components**: PascalCase (Button.tsx, ArcadeGame.tsx)
- **Utilities**: kebab-case for files, camelCase for functions
- **Constants**: UPPER_SNAKE_CASE with descriptive names
- **Variables**: camelCase, descriptive names
- **CSS Classes**: Tailwind utility classes only (no custom CSS)

### Component Structure
```typescript
'use client'; // For interactive components

import React, { useEffect, useRef, useState } from 'react';

const CONSTANT_CONFIG = {
  value: 'example',
};

export default function ComponentName() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<string>('');

  useEffect(() => {
    // Component logic
  }, []);

  return (
    <div ref={ref} className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
}
```

## 3D Development Guidelines

### Three.js Integration
- Use vanilla Three.js (not R3F) for main 3D scene in `/app/3d/page.tsx`
- Set up scene, camera, renderer manually with proper configuration
- Implement custom First Person Controls with WASD + mouse drag
- Use raycasting for object interaction and hover detection

### 3D Scene Setup
```typescript
// Standard camera configuration
const CAMERA_CONFIG = {
  fov: 75,
  near: 0.1,
  far: 1000,
  position: { x: 0, y: 1.6, z: 2 }
};

// Lighting setup
function RoomLightings(scene: THREE.Scene) {
  const ambient = new THREE.AmbientLight(0xff6b6b, 0.08);
  const mainLight = new THREE.DirectionalLight(0xffe6cc, 1.2);
  // Configure shadows and positions
}
```

### Interactive Objects
- Add `userData.section` property to clickable objects
- Use raycaster intersection to detect clicks/hovers
- Maintain consistent height for eye-level camera (y: 1.6)
- Implement boundary limits for camera movement

## UI/UX Guidelines

### Component Patterns
- Use shadcn/ui components from `/components/ui/`
- Apply CVA for component variants (see Button.tsx)
- Implement proper focus states and accessibility
- Use semantic HTML elements

### Theme System
- Wrap app in ThemeProvider (dark/light/system mode)
- Use `next-themes` for theme switching
- Test components in both light and dark modes
- Leverage Tailwind CSS custom properties for theming

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Test 3D scene performance on mobile devices
- Ensure touch controls work if implementing mobile interaction

## Error Handling

### API/Async Operations
```typescript
try {
  // API call or async operation
  const result = await someApiCall();
  return result;
} catch (err) {
  console.error('Operation failed:', err);
  // User-friendly fallback
  return null; // or default value
} finally {
  // Cleanup if needed
}
```

### 3D Error Handling
- Check for WebGL support before initializing scene
- Handle missing 3D assets gracefully
- Implement loading states for heavy 3D models
- Use fallbacks for unsupported features

## Performance Optimization

### 3D Performance
- Optimize geometry and textures for web delivery
- Use appropriate shadow map settings
- Implement LOD (Level of Detail) for complex models
- Consider texture compression for production

### React Performance
- Use React.memo for expensive components
- Implement proper dependency arrays in useEffect
- Avoid unnecessary re-renders in 3D scene
- Use useCallback for event handlers

## Security Configuration

- HSTS, XSS protection, and other security headers configured in next.config.ts
- No sensitive data in client-side code
- Environment variables for API keys and secrets
- Content Security Policy considerations for 3D assets

## Browser Support

- Modern browsers with WebGL 2.0 support
- Fallback message for unsupported browsers
- Test performance across Chrome, Firefox, Safari, Edge
- Consider mobile browser limitations

## Development Workflow

### Before Committing
1. Run `pnpm lint` to check for linting errors
2. Test 3D scene manually with all interactions
3. Verify responsive design at different viewport sizes
4. Check theme switching functionality
5. Validate TypeScript compilation

### 3D Scene Testing Checklist
- [ ] WASD movement works smoothly
- [ ] Mouse drag camera controls responsive
- [ ] Click interactions trigger correctly
- [ ] Hover states display properly
- [ ] Performance acceptable on target devices
- [ ] Audio controls (if applicable) function
- [ ] Modal/dialog overlays work in 3D context

This guide should help maintain consistency and quality across all development work in this 3D portfolio project.