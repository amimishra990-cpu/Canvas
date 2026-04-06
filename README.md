# Canvas - Text-to-Image Generator

A modern, highly polished, light-themed text-to-image AI application powered by Stable Diffusion XL. 

## Features
- **Premium Design:** Clean, subtle SaaS-style UI prioritizing typography and space.
- **Robust State Management:** Handles empty states, loading indicators, and API errors gracefully.
- **Memory Optimized:** Cleans up generated image blobs to prevent memory leaks in the browser.
- **Mobile Responsive:** Fluid layout that adapts beautifully across desktop, tablet, and mobile displays.

## Tech Stack
- Frontend: **React**, **Vite**
- API: **Hugging Face Inference API**
- Model: `stabilityai/stable-diffusion-xl-base-1.0`
- Styling: Custom CSS variables with a polished design system

## Setup Instructions

1. Clone the repository and install dependencies:
   ```sh
   npm install
   ```

2. Duplicate `.env.example` to create your environment variables:
   ```sh
   cp .env.example .env.local
   ```
   Add your Hugging Face API Token inside `.env.local`:
   `VITE_HF_API_TOKEN="hf_your_token_here"`

3. Run the development server locally:
   ```sh
   npm run dev
   ```

## Production Deployment

### Building for Production
Ensure the project builds cleanly for production servers by running:
```sh
npm run build
```
This generates optimized static files inside the `dist` directory.

### Deploy on Vercel
1. Import your GitHub repository to Vercel.
2. In the project settings > Environment Variables, add `VITE_HF_API_TOKEN` and your real token.
3. Deploy! Next to zero configuration needed.

### Deploy on Netlify
1. Connect this repository to your Netlify dashboard.
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Under Site Settings > Environment Variables, add `VITE_HF_API_TOKEN`.
5. Deploy Site!

## API Token Safety
Do **NOT** commit your real API tokens into version control (`.env.local` is ideally ignored, ensure your token only remains injected during build or runtime securely).
