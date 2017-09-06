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

You must configure valid API and frontend endpoints to start developing. Edit `config/dev.js` with the
appropriate values.

```bash
# Install dependencies
$ npm install
$ npm run dev
```

[Load unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.
