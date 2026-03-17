# AGENTS.md - GreenBite Café Development Guide

This guide provides coding standards and workflows for AI agents working on the GreenBite Café codebase.

## Project Overview

**GreenBite Café** is a React-based landing page for a sustainable café. Built with React 18 + Vite 4, using pure CSS styling and custom state-based routing.

- **Tech Stack**: React 18.2.0, Vite 4.5.14, JavaScript (no TypeScript)
- **Node Version**: 18.x (specified in `.nvmrc`)
- **Module System**: ES Modules (`type: "module"`)
- **UI Language**: Spanish

## Build, Lint, and Test Commands

### Development
```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build
npm run vercel-build # Build for Vercel deployment
```

### Testing
**Note**: This project has no test suite configured. No Jest, Vitest, or testing libraries are installed.

### Linting
**Note**: No ESLint or Prettier is configured. Follow the style patterns described below.

## Project Structure

```
GreenBite-cafe/
├── src/
│   ├── components/          # All React components (flat structure)
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── ContactForm.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── Location.jsx
│   │   ├── Menu.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCarousel.jsx
│   │   ├── Products.jsx
│   │   ├── ReservationForm.jsx
│   │   ├── Testimonials.jsx
│   │   ├── components.css   # Shared component styles
│   │   └── index.js         # Component exports
│   ├── styles/
│   │   └── global.css       # Global styles + CSS variables
│   ├── App.jsx              # Main app with routing logic
│   └── main.jsx             # React entry point
├── public/                  # Static assets (images, videos, favicon)
└── index.html              # HTML entry point
```

## Code Style Guidelines

### Import Order
```javascript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
// (none currently in this project)

// 3. Local component imports
import ComponentName from './components/ComponentName';

// 4. Style imports
import './styles/global.css';
import './components/components.css';
```

### Component Structure
```javascript
// Use functional components with hooks
function ComponentName({ prop1, prop2, onCallback }) {
  // 1. State declarations
  const [state, setState] = useState(initialValue);
  
  // 2. Effects
  useEffect(() => {
    // Side effects
    return () => {
      // Cleanup
    };
  }, [dependencies]);
  
  // 3. Event handlers
  const handleEvent = async (e) => {
    e.preventDefault();
    // Logic
  };
  
  // 4. Render
  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
}

// Default export
export default ComponentName;
```

### Naming Conventions
- **Files**: PascalCase for components (`ContactForm.jsx`), lowercase for styles (`components.css`)
- **Components**: PascalCase (`ContactForm`, `ProductCarousel`)
- **Functions**: camelCase (`handleSubmit`, `renderPage`)
- **Constants**: UPPER_SNAKE_CASE for config, camelCase for data arrays
- **CSS Classes**: BEM-like with hyphens (`.hero-split-title`, `.navbar-logo`)
- **Props**: camelCase, use `on` prefix for callbacks (`onNavigate`, `onClose`, `onAdd`)

### State Management
- Use local component state with `useState`
- Pass state via props (prop drilling)
- No global state management (no Context API, Redux, Zustand)

### Conditional Rendering
```javascript
// Ternary for simple conditions
{loading ? <LoadingScreen /> : <MainContent />}

// Logical AND for optional rendering
{isOpen && <Modal />}

// Switch statements for routing
switch(currentPage) {
  case 'menu':
    return <Menu />;
  default:
    return <Home />;
}
```

### Async Operations & Error Handling
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);
  setMessage('');
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (response.ok) {
      setMessage('¡Éxito!');
      e.target.reset();
    }
  } catch (error) {
    console.error('Error:', error);
    setMessage('Hubo un error. Por favor, intenta de nuevo.');
  } finally {
    setSending(false);
  }
};
```

### Form Handling
```javascript
// Controlled components
const [formData, setFormData] = useState({ field: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// Or access via e.target directly in submit
const data = {
  nombre: e.target.nombre.value,
  telefono: e.target.telefono.value,
};
```

## Styling Guidelines

### CSS Variables (Design System)
```css
:root {
  /* Primary colors */
  --brown-main: #7B4A28;
  --brown-dark: #5d3a1a;
  --brown-light: #a0724e;
  
  /* Accent colors */
  --pink-accent: #F4C2C2;
  --green-main: #6B8E23;
  
  /* Neutrals */
  --white: #FFFFFF;
  --cream: #fdf5ec;
  
  /* Shadows */
  --shadow-soft: 0 4px 20px rgba(123, 74, 40, 0.1);
  --shadow-medium: 0 8px 32px rgba(123, 74, 40, 0.15);
  --shadow-hard: 0 12px 48px rgba(123, 74, 40, 0.25);
}
```

### Typography
- **Headings**: 'Montserrat', 'Poppins' (font-weight: 700)
- **Body**: 'Inter', 'Open Sans' (font-weight: 400-600)
- Use semantic HTML (`<h1>`, `<h2>`, `<p>`, etc.)

### CSS Patterns
- Use CSS classes, not inline styles (except for dynamic background images)
- BEM-like naming: `.component-element` (e.g., `.hero-split-title`)
- Transitions: `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`
- Mobile-first responsive design with media queries

### Animations
```css
/* Available keyframe animations */
@keyframes fadeIn { /* opacity: 0 → 1 */ }
@keyframes slideInDown { /* translateY(-100%) → 0 */ }
@keyframes slideInUp { /* translateY(100%) → 0 */ }
@keyframes slideInLeft { /* translateX(-100%) → 0 */ }
@keyframes slideInRight { /* translateX(100%) → 0 */ }
@keyframes scaleIn { /* scale(0.8) → 1 */ }
```

## Integration Patterns

### n8n Webhook Integration
```javascript
await fetch('https://rochy.app.n8n.cloud/webhook/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

### WhatsApp Integration
```javascript
const text = `Mensaje con ${data}`;
window.open(`https://wa.me/573242090985?text=${encodeURIComponent(text)}`, '_blank');
```

## Best Practices

1. **Always clean up timers/intervals**:
   ```javascript
   useEffect(() => {
     const timer = setTimeout(() => {}, delay);
     return () => clearTimeout(timer);
   }, []);
   ```

2. **Disable forms during submission**:
   ```javascript
   <input disabled={sending} />
   <button disabled={sending}>
     {sending ? 'Enviando...' : 'Enviar'}
   </button>
   ```

3. **Provide user feedback**:
   ```javascript
   {message && <div className="form-message">{message}</div>}
   ```

4. **Prevent default on form submissions**:
   ```javascript
   const handleSubmit = async (e) => {
     e.preventDefault();
     // ...
   };
   ```

5. **Use semantic HTML**: `<section>`, `<nav>`, `<footer>`, `<button>` (not `<div>`)

6. **Add accessibility attributes**: `aria-label`, proper `<label>` for inputs

## Known Anti-Patterns (Avoid When Possible)

- Using array index as `key` prop in `.map()` (use unique IDs when available)
- No PropTypes or TypeScript (accept this for now)
- Hardcoded data in components (separate data files would be better)

## Navigation & Routing

This project uses **custom state-based routing** (no React Router):

```javascript
// In App.jsx
const [currentPage, setCurrentPage] = useState('home');

const renderPage = () => {
  switch(currentPage) {
    case 'menu': return <Menu />;
    case 'location': return <Location />;
    default: return <Home />;
  }
};

// Pass navigation to child components
<Navbar onNavigate={setCurrentPage} />

// In child components
<button onClick={() => onNavigate('menu')}>Ver Menú</button>
```

## External Services

- **n8n Webhooks**: Form submission endpoints
  - Reservation: `https://rochy.app.n8n.cloud/webhook/Reserva`
  - Contact: `https://rochy.app.n8n.cloud/webhook/cafeteria-contacto`
- **WhatsApp**: +57 324 209 0985
- **PayPal**: samuelroldanlaverde@gmail.com
- **Unsplash**: External images with query params (`?q=80&w=800`)

## Git Workflow

- Commit messages in Spanish
- Recent focus: mobile responsiveness, form integrations, style consistency
- Branch: main

## Existing Copilot Instructions

From `.github/copilot-instructions.md`:
- Project is a fictional React site for GreenBite Café
- All basic setup steps completed (scaffolding, customization, documentation)

---

**Last Updated**: March 17, 2026
