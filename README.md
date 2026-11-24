# Rock Paper Scissors Game

A fast, responsive Rock Paper Scissors browser game with a polished neon interface.

## Features

- Rock, Paper and Scissors gameplay against the computer
- Live player and computer scores
- Winning streak counter and round indicator
- Recent-round result history
- Optional retro sound effects
- Keyboard controls: `1` Rock, `2` Paper, `3` Scissors
- Responsive mobile and desktop layout
- PWA manifest and SEO metadata
- Accessible buttons, labels and reduced-motion support

## Run locally

From this directory, start any static server:

```bash
npx serve .
```

Then open the local URL shown in your terminal.

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

### Option 2: GitHub

1. Push this folder to a GitHub repository.
2. Import the repository at `https://vercel.com/new`.
3. Set the framework preset to **Other**.
4. Set the root directory to this project folder.
5. Deploy.

No build command or environment variables are required.
