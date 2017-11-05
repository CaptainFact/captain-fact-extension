# How to contribute

## Prerequisites

Familiarity with [forks](https://help.github.com/articles/fork-a-repo/),
[pull requests](https://help.github.com/articles/using-pull-requests) and
[issues](https://guides.github.com/features/issues/).

## Communication

GitHub issues are the primary way for communicating about specific proposed changes to this project.

We also use [Trello](https://trello.com/b/5s6F5iTv/captainfact) to keep track of the tasks we're working on. Feel free to
comment on these tasks directly.

Finally you can join us on [Slack](http://captainfact.slack.com).

## Contributions types

- **Ideas**: Participate in an issue thread or start your own to have your voice heard
- **Resources**: Submit a pull request to add to RESOURCES.md with links to related content
- **Documentation**: Fix typos, clarify language, and add explanations about how things work
- **Code**: Submit new features or bug fixes, see "Code contributions" below

## Contributions: General workflow

1. [Pick or create an issue](https://github.com/CaptainFact/captain-fact-extension/issues) and tell us you're working on it
2. Fork the repo
3. Checkout `staging` branch (pull requests against `master` will not be accepted)
4. Create a new branch describing what you'll do. We encourage using `feature/your-awesome-feature`, `fix/your-fix-name`
   or `improvement/your-improvement` naming
5. Do your stuff and commit your changes
6. (Optional but nice) [squash your commits](https://forum.freecodecamp.org/t/how-to-squash-multiple-commits-into-one-with-git/13231)
7. Make a pull request of your branch against `staging` and mention the issue you're dealing with

## Code contributions

### Developing

#### Starting the API

The quickest way to get the API running locally is by using its Docker image. This image
is currently stored on a private registry, and though we're planning to release it soon you can
contact us if you want to start working on this today. 

A script will help you getting this API up and running (you must have docker installed):
Just execute `./scripts/run_dev_docker_api.sh` from project's root, follow the instructions and you'll end up with 
an Elixir console bind to the API and listening on port 4000(HTTP) + 4001(HTTPS).

Here are some useful commands you may type in:
```elixir
# Get current API version (also available in browser at localhost:4000)
iex> :application.get_key :captain_fact, :vsn
# {:ok, '0.6.1'}

# This image ships with a factory to quickly create users, without worriying about invitations and emails
iex> CaptainFact.Factory.insert :user
# %CaptainFact.Accounts.User{
#  ...
#  email: "tamara1970@gutmann.biz", <- Use this email to connect. Password is "password"
#  ....}
# You can also set some properties directly, like:
iex> CaptainFact.Factory.insert :user, %{reputation: 5000, email: "jougier@captainfact.io"}

# Remove all videos
iex> CaptainFact.Repo.delete_all CaptainFact.Videos.Video
```

#### Starting the extension

Install dependencies with `npm install` then run `npm run dev` to start dev server.
[Load unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) in Chrome with `./dev` folder
and you're ready to go!

Please not that per default, chrome / firefox will block requests as https certificates are auto-signed.
To ensure the extension works properly, you should access https://localhost:4001 with your browser and
confirm the security exception/

A default account should have been created for you with email=`admin@captainfact.io` and password=`password`.

### Code style

*TODO: code style and conventions*

# Conduct

We are committed to providing a friendly, safe and welcoming environment for
all, regardless of gender, sexual orientation, disability, ethnicity, religion,
or similar personal characteristic.

On IRC, please avoid using overtly sexual nicknames or other nicknames that
might detract from a friendly, safe and welcoming environment for all.

Please be kind and courteous. There's no need to be mean or rude.
Respect that people have differences of opinion and that every design or
implementation choice carries a trade-off and numerous costs. There is seldom
a right answer, merely an optimal answer given a set of values and
circumstances.

Please keep unstructured critique to a minimum. If you have solid ideas you
want to experiment with, make a fork and see how it works.

We will exclude you from interaction if you insult, demean or harass anyone.
That is not welcome behaviour. We interpret the term "harassment" as
including the definition in the
[Citizen Code of Conduct](http://citizencodeofconduct.org/);
if you have any lack of clarity about what might be included in that concept,
please read their definition. In particular, we don't tolerate behavior that
excludes people in socially marginalized groups.

Private harassment is also unacceptable. No matter who you are, if you feel
you have been or are being harassed or made uncomfortable by a community
member, please contact one of the channel ops or any of the
[CaptainFact](https://github.com/CaptainFact) core team
immediately. Whether you're a regular contributor or a newcomer, we care about
making this community a safe place for you and we've got your back.

Likewise any spamming, trolling, flaming, baiting or other attention-stealing
behaviour is not welcome.

# Frequently Asked Questions

*TODO*
