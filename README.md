# Anirveda

This repository contains the source code for anirveda's website.

Visit the website at [anirveda.osailpdeu.in](anirvedapdeu.in)

## Tech Stack

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (for development server)

> Here's the [maintainer's guide](./Maintainers.md) for maintainers.

## How to run the website locally

### Prerequisites

- Node.js (Download from [here](https://nodejs.org/en/download/)) - version 16.x or higher recommended
- npm (comes with Node.js)

## Deployment on Vercel

This project is configured for seamless deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the build settings
3. Production environment variables are stored in `.env.production`
4. The build command will be automatically set to `npm run build`
5. The output directory is set to `dist`

### Steps

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the development server
4. Open `localhost:3000` in your browser
