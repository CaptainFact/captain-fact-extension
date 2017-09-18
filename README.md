## Features

### Icon helper

A small icon appears when you're watching a video that has been verified on CaptainFact.io. It
tells you, based on votes, if the statement you're hearing (or what is shown) is believed to be
true or false.

![Icon approve](misc/approve.gif)
![Icon refute](misc/refute.gif)

### Facts overlay

When clicked, the CaptainFact icon displays facts and comments about current statement and
their respective scores.

![Demo screenshot](misc/demo-youtube.jpg)

## Installation

The application is available on the
[Chrome Web Store](https://chrome.google.com/webstore/detail/captainfact-beta/fnnhlmbnlbgomamcolcpgncflofhjckm)


## Development

You must configure valid API and frontend endpoints to start developing - edit `config/dev.js` with the
appropriate values. For example, you can plug it on [captainfact.io](https://captainfact.io) with:
```ecmascript 6
export const FRONT_URL = "https://captainfact.io"
export const API_URL = "https://captainfact.io:8443"
```

Install dependencies with `npm install` then run `npm run dev` to start dev server.
[Load unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) in Chrome with `./dev` folder
and you're ready to go!
