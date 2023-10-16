# [URL Shortener](https://url.salimi.my) &middot; [![Author Salimi](https://img.shields.io/badge/Author-Salimi-%3C%3E)](https://www.linkedin.com/in/mohamad-salimi/)

URL Shortener is an app to shorten URLs and generate short links created using NextJS. URL Shortener allows users to create a custom keyword shortened link making it easy to share and viewing analytics of that link.

## Simple URL shortener tool

- Custom keyword for short URL slug
- Statistics / analytics of links
- Light / dark / system mode
- Authentication using Clerk
- MySQL, PlanetScale & Prisma for database
- Zustand for state management
- Hosted in Vercel

## Tech/framework used

- Next.js 13 App Dir
- Shadcn/ui
- Clerk
- Tailwind CSS
- TypeScript
- MySQL
- PlanetScale
- Prisma
- Zustand
- Vercel

## Starting the project

Open the [.env.example](/.env.example) and fill in your Database URL & Clerk Auth Configurations then save it as .env the run the following command:

```bash
npm install
npx prisma db push
npx prisma generate
npm run dev
```

## Demo

The app is hosted on Vercel. [Click here](https://url.salimi.my) to visit.
<br>
Direct link: `https://url.salimi.my`

## Screenshots

#### Sign in

![Sign in](/screenshots/screenshot-1.png)

#### Sign up

![Sign up](/screenshots/screenshot-2.png)

#### Dashboard

![Dashboard](/screenshots/screenshot-3.png)

#### Listing

![Listing](/screenshots/screenshot-4.png)

#### Create short URL

![Create short URL](/screenshots/screenshot-5.png)

#### Short URL details

![Create short URL](/screenshots/screenshot-6.png)

#### Profile

![Profile](/screenshots/screenshot-7.png)

#### Mini sidebar

![Mini sidebar](/screenshots/screenshot-8.png)

#### Dark mode

![Dark mode](/screenshots/screenshot-9.png)
