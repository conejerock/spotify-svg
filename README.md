# Spotify SVG

> Create your SVG file with your current played song on [Spotify](https://spotify.com).

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/conejerock/spotify-svg.git
$ cd spotify-svg
```

To install and set up the library, run:

```sh
$ yarn install
```

## Configuration

At first, you must to create an **Application** as a [Spotify developer](https://developer.spotify.com/dashboard/applications).

When you register the app, create an `.env` file with

```dotenv
SPOTIFY_CLIENT_ID=<spotify_client_id>
SPOTIFY_CLIENT_SECRET_ID=<spotify_client_secret_id>

EXPRESS_HOSTNAME=localhost 
EXPRESS_PORT=8888 
EXPRESS_CALLBACK=callback 
EXPRESS_SVG_PATH=current-spotify.svg 
```

* **SPOTIFY_CLIENT_ID** - Client ID provided by Spotify Application
* **SPOTIFY_CLIENT_SECRET_ID** - Client Secret provided by Spotify Application
* **EXPRESS_HOSTNAME** - Hostname where the server will be created *(default: localhost)*
* **EXPRESS_PORT** - Port where the server will be created *(default: 80)*
* **EXPRESS_CALLBACK** - Redirect URI where Application Spotify redirect after authentication success *(default: callback)*
* **EXPRESS_SVG_PATH** - URI to access your final SVG file *(default: current-spotify.svg)*

## Usage
### Create token
To create token, with .env configured, run:
```sh
$ yarn create-token
```
And **click** on link to acquire the **Spotify application** `token`

### Serving the app
Finally, to run app with token saved, run:

```sh
$ yarn start
```

## Demo
![](http://spotify-svg.juanjoconejero.com:80/current-spotify.svg)


## Contributing

Please read [CONTRIBUTING.md](https://github.com/github/docs/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:


## License

[MIT License](https://github.com/conejerock/spotify-svg/blob/main/LICENSE) © Juanjo Conejero
