/**
 Injected on https://captainfact.io to inform the website that the extension
 is already installed. Main goal of this feature is for the user to unlock
 the "Bulletproof" achievement.
 */

const isInstalledNode = document.createElement('div')
isInstalledNode.id = 'captainfact-extension-installed'
isInstalledNode.style.display = 'none'
document.body.appendChild(isInstalledNode)
