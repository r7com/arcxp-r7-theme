# NewR7-Themes-PageBuilder-Fusion-Features-Mirror

## Docker
The Fusion engine and services that support it run in Docker containers that can be spun up for local development. To do so, you'll need to download and install Docker if you haven't already. Once you've installed Docker, you'll probably want to allocate at least 6GB of RAM to it so it has the resources necessary to run all the services Fusion requires.


## Clone the repo
`git clone git@github.com:arc-partners/NewR7-Themes-PageBuilder-Fusion-Features-Mirror.git`


## Environment Variables
If you don't already have a `.env` file in the root directory, create the file and add:
```
CONTENT_BASE=https://api.sandbox.newr7.arcpublishing.com
ARC_ACCESS_TOKEN=<<YOUR-ACCESS-TOKEN>>
resizerKey=<<ASK-YOUR-TDM-OR-SA-FOR-THIS>>
```
More information about environment variables [here](https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/api/feature-pack/environment.md).


## NPMRC
To be able to run locally, you need to create a read-only token in [Github](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). This token needs to be added to your `.npmrc` file and will allow you to view and install Themes blocks locally. The `.npmrc` file must never be added to the repo or checked in. Note: A `.npmrc-encrypted` file will be added by PageBuilder Engine when zipping the bundle for non-local environments. Please use the following format when setting up your .npmrc:
```
@wpmedia:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<<PASTE-HERE>>
```


## Starting Fusion
1. Download the `node_modules`: `npm install`
2. To run fusion: `npx fusion start`
3. Navigate to `http://localhost/pagebuilder/pages` to see the PageBuilder Admin.
4. If you want to pre-populate your local database with the Sandbox database, see [here](https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/configuring-feature-pack.md).


## Stopping Fusion
The server needs to be running while you are developing locally, but when you need to stop it, use this command: `npx fusion down`


## More information
[Helpful Commands](https://redirector.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/recipes/helpful-commands.md)

[Fusion tutorials](https://redirector.arcpublishing.com/alc/alc/arc-products/pagebuilder/fusion/2.6)
