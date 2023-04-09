<p align="center"><img src="app/assets/img/icon.png" height="100"/></p>
<h1 align="center"><a href="https://captainfact.io">CaptainFact.io</a></h1>

<table>
  <thead>
    <tr>
      <th>Community</th>
      <th>Master</th>
      <th>Staging</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <a href="https://discord.gg/2Qd7hMz" title="Discord"><img src="https://discordapp.com/api/guilds/416782744748687361/widget.png" alt="Discord"></a>
        <a href="https://twitter.com/CaptainFact_io" title="Twitter"><img src="https://img.shields.io/twitter/follow/CaptainFact_io.svg?style=social&label=Follow"></a>
        <a href="https://opencollective.com/captainfact_io" title="Backers on Open Collective"><img src="https://opencollective.com/captainfact_io/backers/badge.svg"></a>
        <a href="./LICENSE"><img src="https://img.shields.io/github/license/CaptainFact/captain-fact-extension.svg" alt="GPL3"></a>
        <a href="https://github.com/CaptainFact/captain-fact-extension/releases"><img src="https://img.shields.io/github/v/release/CaptainFact/captain-fact-extension" alt="GitHub release" /></a>
      </td>
      <td>
        <a href="https://github.com/CaptainFact/captain-fact-extension/actions/workflows/ci.yml"><img src="https://github.com/CaptainFact/captain-fact-extension/actions/workflows/ci.yml/badge.svg" alt="Build Status"/></a>
        <a href='https://coveralls.io/github/CaptainFact/captain-fact-extension?branch=master'><img src='https://coveralls.io/repos/github/CaptainFact/captain-fact-extension/badge.svg?branch=master' alt='Coverage Status' /></a>
      </td>
      <td>
        <a href="https://github.com/CaptainFact/captain-fact-extension/actions/workflows/ci.yml"><img src="https://github.com/CaptainFact/captain-fact-extension/actions/workflows/ci.yml/badge.svg?branch=staging" alt="Build Status"/></a>
        <a href='https://coveralls.io/github/CaptainFact/captain-fact-extension?branch=staging'><img src='https://coveralls.io/repos/github/CaptainFact/captain-fact-extension/badge.svg?branch=staging' alt='Coverage Status' /></a>
      </td>
    </tr>
  </tbody>
</table>

<hr/>

<p align="center">
<a href="https://opencollective.com/captainfact_io/donate" target="_blank">
  <img src="https://opencollective.com/captainfact_io/donate/button@2x.png?color=blue" width=300 />
</a>
</p>

---

## Install

| **Chrome**     | **Firefox**    | **Opera**                        | **Safari** | **EDGE** |
| -------------- | -------------- | -------------------------------- | ---------- | -------- |
| [Available][0] | [Available][1] | Works with [Chrome extension][0] | Not yet    | Not yet  |

[0]: https://chrome.google.com/webstore/detail/captainfact-beta/fnnhlmbnlbgomamcolcpgncflofhjckm 'Install for Chrome'
[1]: https://addons.mozilla.org/en-US/firefox/addon/captainfact/ 'Add to Firefox'

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

## Development

### Start the API

See https://github.com/CaptainFact/captain-fact-api

### Run local extension development server

- Install (if you don't have them):
  - [Node.js](http://nodejs.org)
  - App dependencies: `npm install`
  - `npm start` - Start the overlay injector test pages on http://localhost:3342
  - `npm run test` - Runs all unit tests

## FAQ

- Why do you need storage permissions?

We store a local cache of videos IDs that exist on CaptainFact. This cache gets updated when you visit YouTube
if it's older than 15 minutes. This is a privacy improvement that guarantees we don't track the videos you're
watching and don't send unnecessary requests.

- Why do you need tab permissions?

Because the script is injected programmatically in the background (only if video is known from cache) and
to be able to turn off CaptainFact on all tabs when you unselect it from the extension popup.

You can check by yourself in `chrome/extension/background.js` (look for `chrome.tabs.`)

- Why do you need Youtube permissions?

To be able to inject the facts overlay on YouTube videos.

- Why do you only inject on youtube.com and not in embedded players everywhere else?

We may want to implement this in a separate release in the future. We don't want to implement
this feature in main extension cause it means asking for permissions to access all your sites.

- Can I add sources on videos directly from the extension?

Not at the moment.

## Linked projects

- [Community discussions and documentation](https://github.com/CaptainFact/captain-fact/)
- [API](https://github.com/CaptainFact/captain-fact-api)
- [Frontend](https://github.com/CaptainFact/captain-fact-frontend)
- [Overlay Injector](https://github.com/CaptainFact/captain-fact-overlay-injector)

## License

GNU General Public License v3.0

Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works
and modifications, which include larger works using a licensed work, under the same license. Copyright and license
notices must be preserved. Contributors provide an express grant of patent rights.

See [LICENSE](LICENSE) for more info.
