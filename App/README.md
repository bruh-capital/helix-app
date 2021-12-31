<h1 align="center">Helix Dapp 🧬</h1>

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.


## More

This folder of the repo is a NextJS project that is the PWA/Website for interacting with the Helix Solana Programs

Some environment variables are used in the app for QOL  
`.env.development` is used for running programs on localnet (test validator)  
`.env.production` is used for deploys to the [Dapp frontend URL](https://app.helixdao.org)  

## Organization

`/_hooks` => Hooks/State-dependent things, abstracted interactions  
`/_includes` => UI components or sections  
`/_layouts` => Page Layouts  
`/_idl` => Program(s) IDL for anchor client  
`/_baseutils` => Program interaction code  



