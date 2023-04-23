# wrkload

Is a web app where you can track what you've worked on in a simple and organized way.

[Visit it](https://wrkload.vercel.app/)

## Features
- Create tasks easily and quickly. Organize them into projects and obtain statistics that will help you control your monthly workload.
- User-friendly interface with dark and light mode.
- Optimistic UI. We are optimistic that whatever you do will always work, which is why we update the interface before the server validates your actions. If they fail, we will let you know so you can try again.
- Device-agnostic experience.
- Fast and secure authentication.

## For curious devs
- **Authentication:** Two types of JWT were implemented, a refresh token and an access token. The refresh token is set on the client-side from the server-side when logging in through a secure and HttpOnly cookie. It is used to generate a valid access token each time it expires. We use Axios interceptors to verify if the access token exists when making a request that requires it. If it is not found, a new access token is requested to the backend by sending the refresh token. The backend validates the refresh token, verifying that it belongs to the user requesting it through their ID.
- **Data fetching:** SWR was used to efficiently and optimally manage client-side data fetching. This library allowed us to automatically have a global state with persistence through cookies and avoid the use of libraries such as Redux or similar ones. Data is obtained or sent using Axios and SWR takes care of caching them so that they can be consumed from any part of the application.
- **Optimistic UI:** actions that the user performs that involve data fetching from the server have no delay. Interface changes take effect instantly without waiting for the server to validate them. If there is a failure, a notification is displayed and the interface is rolled back to the previous state. This is achieved thanks to SWR, when the user initiates a data exchange, the cache is mutated at the same time as the request to the server is initiated, so the data that the user has is up-to-date.
- **Improving readability:** React Wrap Balancer was used to prevent word imbalance per line, making the reading experience more fluid and visually balanced texts.

## Built With

- [Next.JS](https://github.com/vercel/next.js)
- [TypeScript](https://github.com/microsoft/TypeScript)
- [Tailwind](https://github.com/tailwindlabs/tailwindcss)
- [SWR](https://github.com/vercel/swr)
- [Backend](https://github.com/kilimanjjjaro/wrkload-api)
- [All dependencies](https://github.com/kilimanjjjaro/wrkload-frontend/blob/main/package.json)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or (recommended)
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or (recommended)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
