# Repro for initialising Sentry multiple times

This repo contains a simplified app shell implementation to try and reproduce issues we're having with measuring our apps using Sentry.

## Requirements

- Node 14.x (see `.nvmrc`)
- Python 3.x

## Building

You first need to set up two Sentry projects, one for app-1 and one for app-2. The update the DSNs in each of the apps' `ErrorBoundary.tsx` component.

To build the apps, run:

```
make install
make build
```

To serve run:

```
make serve
```
