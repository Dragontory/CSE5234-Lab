# CSE5234-Lab / jetstore

A small Create React App project named `jetstore` used for CSE5234 lab exercises.

## What this is

This repository contains a React application scaffolded with Create React App (uses `react-scripts`). It includes simple components under `src/components/` and the usual CRA structure.

## Prerequisites

- Node.js (recommended LTS: 16.x or 18.x)
- npm (comes with Node)

Verify your environment in PowerShell:

```powershell
node -v
npm -v
```

## Install dependencies

From the project root (`jetstore` folder):

```powershell
cd 'c:\Users\toryy\OneDrive\Documents\Visual Studio Code\CSE 5234\CSE5234-Lab\jetstore'
npm install
```

## Run the development server

Start the app:

```powershell
npm start
```

If port 3000 is already in use, CRA will prompt to run on another port. To avoid the prompt and start on a specific port, set the `PORT` environment variable first (PowerShell):

```powershell
$env:PORT = "3001"; npm start
```

The app will be served at `http://localhost:3000` (or the port you choose).

## Build for production

```powershell
npm run build
```

The optimized build is written to the `build/` folder.

## Run tests

Interactive watch mode:

```powershell
npm test
```

Run tests once (non-watch) in PowerShell:

```powershell
$env:CI = "true"; npm test -- --watchAll=false
```

## Common issues & troubleshooting

- Deprecation warnings from `webpack-dev-server` (e.g., about `onBeforeSetupMiddleware`) are harmless and come from dependencies (CRA/react-scripts). The dev server should still run.
- If `npm start` appears stuck, check the terminal: CRA may be waiting for your input (for example, to accept running on a different port).
- File watching can be unreliable when the project is stored inside OneDrive. If you see hot-reload or watcher errors, consider moving the repo to a local folder like `C:\Projects\jetstore` while developing.
- To see which process is using a port (example for port 3000) in PowerShell:

```powershell
Get-NetTCPConnection -LocalPort 3000 | Format-List
(Get-NetTCPConnection -LocalPort 3000).OwningProcess
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

- To forcibly kill the process (use with care):

```powershell
# Replace <PID> with the actual process id
Stop-Process -Id <PID> -Force
```

## Security / audits

You may see `npm audit` reports after `npm install`. Try:

```powershell
npm audit
npm audit fix
```

Use `npm audit fix --force` only if you are prepared to test for breaking changes.

## Notes

- This README is a minimal guide to get the app running locally. If you want a CI config, deployment steps, or to remove CRA deprecation warnings by customizing the dev server, I can add instructions or implement those changes.
