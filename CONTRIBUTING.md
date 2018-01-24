# How to contribute

## Prerequisites

Familiarity with [forks](https://help.github.com/articles/fork-a-repo/),
[pull requests](https://help.github.com/articles/using-pull-requests) and
[issues](https://guides.github.com/features/issues/).

This repo uses a git submodule (overlay-injector). You should clone it with:

```bash
git clone --recursive https://github.com/CaptainFact/captain-fact-extension.git
```

You should also use npm > 5.0.0 to handle local dependencies properly (see http://blog.npmjs.org/post/161081169345/v500)

## Communication

[![Join the chat at https://gitter.im/CaptainFact](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/CaptainFact)

GitHub issues are the primary way for communicating about specific proposed changes to this project.

We also use [Trello](https://trello.com/b/5s6F5iTv/captainfact) to keep track of the tasks we're working on. Feel free to
comment on these tasks directly.

## Contributions: General workflow

1. [Pick or create an issue](https://github.com/CaptainFact/captain-fact-extension/issues) and 
   tell us you're working on it
2. Fork the repo
3. Checkout `staging` branch (pull requests against `master` will not be accepted)
4. Create a new branch describing what you'll do. We encourage using `feature/your-awesome-feature`, `fix/your-fix-name`
   or `improvement/your-improvement` naming
5. Do your stuff and commit your changes
6. (Optional but nice) [squash your commits](https://forum.freecodecamp.org/t/how-to-squash-multiple-commits-into-one-with-git/13231)
7. Make a pull request of your branch against `staging`

## Code contributions

### Developing

#### Testing against staging server

You can set the API_URL in `config/dev.js` to `https://graphql.staging.captainfact.io`
to test your changes in a safe environment. [Contact us](contact@captainfact.io) if
you need accounts or an access to GraphiQL, we'll provide you anything you need :) 

#### Starting the API locally

*Coming soon*

#### Starting the extension

Install dependencies with `npm install` then run `npm run dev` to start dev server.
[Load unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) in Chrome with `./dev` folder
and you're ready to go!

Please note that per default, chrome / firefox will block requests as https certificates are auto-signed.
To ensure the extension works properly, you should access https://localhost:5001 with your browser and
confirm the security exception.

#### Building the extension

* `npm run build` => Build the extension for prod
  You can also run `npm run build_staging` and `npm run build_dev` to build for different envs
* `npm run compress` => Generate .zip and .crx based on build folder
