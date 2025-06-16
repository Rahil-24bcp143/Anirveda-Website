# Guide for maintaining the website

## Folder structure

```bash
.
├── public
│   └── images
│       ├── committee
│       ├── grid
│       ├── pastevents
│       ├── logos
│       └── upcomingEvents
├── src
│   ├── components
│   ├── data
│   ├── Pages
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── ScrollToTop.jsx
│   └── style.css
├── .gitignore
├── index.html
├── Maintainers.md
├── package-lock.json
├── package.json
├── postcss.config.cjs
├── README.md
├── tailwind.config.cjs
└── vite.config.js
```

## Understanding the folder structure

### Public folder

`public/` - Contains all the static files such as images, favicon, etc.

`public/images/` - Contains all the images used in the website.

`public/images/committee/` - Contains all the images of the committee members.
`committee/` has serveral folders named after the respective departments. Each of these folders contains the images of the committee members for that department.

`public/images/grid/` - Contains all the images used in the gallery page of the website.

`public/images/pastevents/` - Contains all the images of the past events section on the event page.

`public/images/logos/` - Contains all the logos of the Anirveda.

`public/images/upcomingEvents/` - Contains all the images of the upcoming events section on the home page.

---

### Src folder

`src/` - Contains all the source code for the website.

`src/components/` - Contains all the components used in the website. `components/` has several folders named after the respective pages. Each of these folders contains the components used in that page.

`src/data/` - Contains all the data used in the website.

`src/data/committee/` - Contains all the json of the advisors and executive memebres of the Anirveda. It is shown in the committee page of the website.

`src/data/departments/` - Contains all the json of the members of departments of the Anirveda. It contains folder named after the respective departments. Each of these folders contains the json of the members of that department.

`src/data/galleryImages.js` - Contains the json of the images used in the gallery page of the website.

`src/data/prevEvents.js` - Contains the json of the past events. It is shown in the events page of the website.

`src/data/upcomingEvents.js` - Contains the json of the upcoming events. It is shown in the home page of the website and on the events page of the website.

`src/Pages/` - Contains all the pages of the website. `Pages/` has several ".jsx" files named after the respective pages. Each of these files contains the code for that page.

`src/App.jsx` - Contains the code for the Routes of the website.

`src/index.css` - Contains the css for the the tailwind classes.

`src/main.jsx` - Contains the code for the main app.

`src/ScrollToTop.jsx` - Contains the code for the scroll to top functionality. React Routers preserve the scroll position when navigating between pages. This component is used to scroll to the top of the page when the user navigates to a new page.

`src/style.css` - Contains the css for the website.

---

### Root folder

`.gitignore` - Contains the files and folders that are ignored by git.

`index.html` - Contains the html for the website.

`Maintainers.md` - Contains the guide for the maintainers.

`package-lock.json` and `package.json` - Contains the dependencies for the website.

`postcss.config.cjs` - Contains the postcss configuration reqyired for tailwind.

`README.md` - Contains the documentation for the website.

`tailwind.config.cjs` - Contains the tailwind configuration for the website.

`vite.config.js` - Contains the vite configuration for the website.

---

## How to update the website

You just have to change the json files in the `src/data/` folder and the images in the `public/images/` folder.

> Note: All the images should be in the `.webp` format.

## How to run the website locally

### Prerequisites

- Node.js (Download from [here](https://nodejs.org/en/download/))
- npm (comes with Node.js)

### Steps

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npm run dev` to start the development server
4. Open `localhost:3000` in your browser

## How to deploy the website

1. Run `npm run build` to build the website

Then `dist/` folder will be created. Upload the contents of the `dist/` folder to the hostinger.
