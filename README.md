# Arnab Samadder - Portfolio (Next.js)

A modern, responsive portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and beautiful UI components inspired by Aceternity UI and shadcn/ui.

## 🚀 Features

- **Modern Stack**: Next.js 16 with App Router, TypeScript, and Tailwind CSS v4
- **Beautiful UI**: Custom components inspired by Aceternity UI and shadcn/ui
- **Fully Responsive**: Optimized for mobile, tablet, and desktop (320px - 2560px+)
- **Complete Portfolio**: All sections from original site (8 sections)
- **Smooth Animations**: Framer Motion throughout with scroll triggers
- **Video Background**: Auto-playing background with optimal performance
- **Interactive Navigation**: Sticky header with active section highlighting
- **Service Showcase**: Tabbed interface for Graphics, Video, Photography, Research
- **Project Gallery**: Beautiful cards with hover effects
- **Contact Integration**: All social links and email ready

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📦 Installation

1. Navigate to the project directory:
   ```bash
   cd arnob-portfolio-nextjs
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
arnob-portfolio-nextjs/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles + animations
├── components/
│   ├── navigation.tsx      # Sticky nav with mobile menu
│   ├── hero-section.tsx    # Hero with video background
│   ├── about-section.tsx   # Organizations & Education
│   ├── services-section.tsx # Tabbed services showcase
│   ├── recent-works-section.tsx # Portfolio items
│   ├── projects-section.tsx # Major projects
│   ├── research-section.tsx # Research with filters
│   ├── blogs-section.tsx   # Blog articles
│   ├── contact-section.tsx # Social links & contact
│   └── ui/                 # Reusable UI components
│       ├── spotlight.tsx
│       ├── background-gradient.tsx
│       ├── text-generate-effect.tsx
│       └── infinite-moving-cards.tsx
├── public/
│   ├── assets/             # All images (27 files)
│   ├── videos/             # Background videos
│   └── cv/                 # Your CV (add cv.pdf here)
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Customization

### Colors
Edit the color scheme in `app/globals.css` by modifying the CSS variables in `:root` and `.dark`.

### Content
Update the content in `components/hero-section.tsx`:
- Change titles and subtitles
- Modify organization logos array
- Adjust animation timings

### Images
Replace images in `public/assets/` with your own:
- `profile-photo2.png` - Main profile image
- Organization logos (ias.png, pstu.png, etc.)

### Video Background
Replace video files in `public/videos/` with your own background video.

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project to [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

## 🔧 Environment Variables

No environment variables are required for the basic setup.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🎯 Sections Included

✅ **Home/Hero** - Video background with profile images and logos
✅ **About** - Organizations and Education with tabs
✅ **Services** - Graphics, Video, Photography, Research (tabbed)
✅ **Recent Works** - Portfolio showcase grid
✅ **Projects** - Major projects with descriptions
✅ **Research** - Ongoing, Published, Proposals (filtered)
✅ **Blogs** - Article cards with dates
✅ **Contact** - Social links, CV download, email

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 639px (1 column)
- **Tablet**: 640px - 1023px (2 columns)
- **Desktop**: 1024px - 1279px (3 columns)
- **Large**: 1280px+ (4 columns, side images)

## 📄 License

This project is for personal use.

## 🙏 Acknowledgments

- UI inspiration from [Aceternity UI](https://ui.aceternity.com/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Built with ❤️ using Next.js and Tailwind CSS
