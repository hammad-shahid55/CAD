# CAD Outsource - Professional CAD Design Services Website

A modern, responsive website for CAD Outsource, a UK-based CAD design and engineering services company. Built with Astro, React, and Tailwind CSS.

## Project Overview

This is a full-featured business website showcasing CAD design services including:

- 2D Drafting & Designing
- 3D Modeling & Rendering
- As-Built Drawings
- HVAC Drawings
- Solar PV Layouts & Wiring
- Commissioning & Pre-Commissioning Drawings
- Legionella Schematic Drawings
- CAD Conversion Services
- Facilities Mapping & GIS

## Tech Stack

- **Framework**: [Astro](https://astro.build) v5.12.0
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4.1.3
- **Form Handling**: React Hook Form + Zod validation
- **Email Service**: Resend API
- **Package Manager**: Bun
- **Deployment**: Vercel (configured)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh) (latest version)
- Node.js 18+ (if using npm as fallback)

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd cad-designing-qbk
   ```

2. **Install dependencies using Bun**:
   ```bash
   bun install
   ```

   This will install all project dependencies defined in `package.json`.

## Environment Setup

1. **Create a `.env` file** in the root directory:
   ```bash
   touch .env
   ```

2. **Add the following environment variables**:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   OFFICIAL_EMAIL=hamadsami672@gmail.com
   ```

   **Note**: Replace `your_resend_api_key_here` with your actual Resend API key. You can get one from [resend.com](https://resend.com).

## Running the Project

### Development Server

Start the development server with hot-reload:

```bash
bun run dev
```

The site will be available at `http://localhost:4321`

### Build for Production

Create an optimized production build:

```bash
bun run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
bun run preview
```

## Project Structure

```
cad-designing-qbk/
├── public/                 # Static assets (favicon, robots.txt)
├── src/
│   ├── components/         # Astro and React components
│   │   ├── about/         # About page components
│   │   ├── asbuilt/        # As-built service components
│   │   ├── cadConversion/ # CAD conversion components
│   │   ├── commissioning/  # Commissioning components
│   │   ├── contact/        # Contact page components
│   │   ├── drafting/       # Drafting service components
│   │   ├── gis/            # GIS service components
│   │   ├── globalComponents/ # Header, Footer
│   │   ├── homeComponents/ # Homepage sections
│   │   ├── hvac/           # HVAC service components
│   │   ├── legionella/     # Legionella service components
│   │   ├── rendering/      # 3D rendering components
│   │   ├── sectors/        # Industry sectors components
│   │   ├── solar/          # Solar PV components
│   │   ├── ui/             # Reusable UI components (React)
│   │   └── SEO.astro       # SEO component
│   ├── data/               # Static data files
│   ├── layouts/            # Page layouts
│   ├── lib/                # Utility functions
│   ├── pages/              # Route pages
│   │   ├── api/            # API endpoints
│   │   │   ├── contact/    # Contact form API
│   │   │   └── sendMessage/ # Instant message API
│   │   └── ...             # Other pages
│   ├── reactComponents/    # React components
│   ├── styles/            # Global styles
│   └── templates/         # Email templates
├── astro.config.mjs        # Astro configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── .env                    # Environment variables (create this)
```

## API Endpoints

The project includes two API endpoints for form submissions:

### 1. Contact Form API
- **Endpoint**: `/api/contact/contact`
- **Method**: POST
- **Purpose**: Handles full contact form submissions with budget and timeline

### 2. Instant Message API
- **Endpoint**: `/api/sendMessage/sendMessage`
- **Method**: POST
- **Purpose**: Handles quick instant message form submissions

Both endpoints:
- Validate input using Zod schemas
- Send notification emails to the official email address
- Send thank you emails to customers
- Use Resend API for email delivery

## Email Configuration

The project uses [Resend](https://resend.com) for email delivery:

1. **Sign up** for a Resend account at https://resend.com
2. **Get your API key** from the Resend dashboard
3. **Add it to your `.env` file** as `RESEND_API_KEY`
4. **Set `OFFICIAL_EMAIL`** to the email address where you want to receive form submissions

**Note**: For testing, you can use `onboarding@resend.dev` as the from email. For production, you'll need to verify your domain in Resend.

## Styling

The project uses Tailwind CSS 4.x with:
- Custom color schemes
- Responsive design utilities
- Custom animations and transitions
- Gradient backgrounds
- Modern UI components

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run astro` - Run Astro CLI commands

## Deployment

The project is configured for deployment on Vercel:

1. **Push your code** to a Git repository
2. **Import the project** in Vercel
3. **Add environment variables** in Vercel dashboard:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `OFFICIAL_EMAIL`
4. **Deploy** - Vercel will automatically build and deploy

## Contact Information

- **Phone**: +923138576996
- **Email**: hamadsami672@gmail.com
- **Location**: Birmingham, UK

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Your Resend API key | Yes |
| `RESEND_FROM_EMAIL` | Email address to send from | Yes |
| `OFFICIAL_EMAIL` | Email to receive form submissions | Yes |

## Troubleshooting

### Port Already in Use
If port 4321 is already in use, Astro will automatically try the next available port.

### Email Not Sending
- Verify your `RESEND_API_KEY` is correct
- Check that `OFFICIAL_EMAIL` is set correctly
- Ensure your Resend account is active
- For production, verify your domain in Resend

### Build Errors
- Clear the `.astro` cache: `rm -rf .astro`
- Delete `node_modules` and reinstall: `rm -rf node_modules && bun install`
- Check that all environment variables are set

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [Resend Documentation](https://resend.com/docs)
- [Bun Documentation](https://bun.sh/docs)

## License

© 2025 CAD Outsource. All rights reserved.

---

Built with Astro, React, and Tailwind CSS
