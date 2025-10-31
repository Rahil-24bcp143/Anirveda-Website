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

## Deployment

### Appwrite Sites (Recommended)

This project is now optimized for deployment on Appwrite Sites:

1. **Quick Setup**: Run `./appwrite-setup.ps1` to verify your configuration
2. **Push to GitHub**: Commit and push your changes
3. **Deploy**: Go to [Appwrite Console](https://cloud.appwrite.io) → Sites → Create Site
4. **Configure**: Connect your GitHub repository and deploy
5. **Custom Domain**: Configure `osailpdeu.in` in the Domains section

For detailed instructions, see [DEPLOYMENT_APPWRITE.md](./DEPLOYMENT_APPWRITE.md)

### Vercel (Legacy)

This project can also be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the build settings
3. Production environment variables are stored in `.env.production`
4. The build command will be automatically set to `npm run build`
5. The output directory is set to `dist`

## Environment Variables

Required environment variables for production:

```bash
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=68e0e6c70006bba52ef3
```

### Steps

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the development server
4. Open `localhost:3000` in your browser
