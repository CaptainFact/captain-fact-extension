<p align="center"><img src="chrome/assets/img/icon.png" height="100"/></p>
<h1 align="center"><a href="https://captainfact.io">CaptainFact.io</a></h1>
<br/>

## Extension Features

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

## How does it work ?

We store a local cache of videos ids that exist on CaptainFact. This cache gets updated if you watch a video on Youtube
and it haven't been synced for more than 5 minutes. 
This is a privacy improvement that guarantees we don't track the videos you're watching and don't send unnecessary 
requests.

## Development

You must configure valid API and frontend endpoints to start developing - edit `config/dev.js` with the
appropriate values. For example, you can plug it on [captainfact.io](https://captainfact.io) with:
```ecmascript 6
export const FRONT_URL = "https://captainfact.io"
export const API_URL = "https://captainfact.io:8443"
```

Be sure to use a compatible API version - major and minor must match
(using 0.6.0 with 0.6.7 is ok, but 0.6.0 with 0.7.0 may not work).
To check for the API version, make a GET request to the API root.

Install dependencies with `npm install` then run `npm run dev` to start dev server.
[Load unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) in Chrome with `./dev` folder
and you're ready to go!

## License

GNU General Public License v3.0

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.

See [LICENSE](LICENSE) for more info.
