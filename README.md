# acc-server-manager

[Assetto Corsa Competizione][acc] Server Manager. 

## Quick Start

Run `npm run start` to start the development server on [http://localhost:8080][dev].

To override the environment config, create a file `config/${env}.local.js`, e.g.
`config/dev.local.js`. This allows for easily modifying the runtime configuration
on a machine specific basis (_not currently used_).


## Commands

__npm run start__<br>
Starts the development server with hot module replacement on [http://localhost:8080][dev],
sources are not minified and sourcemaps are created.  The config from `config/dev.js`
will be used.

__npm run build__<br>
Creates a development build in `dist/`, sources are not minified and sourcemaps
are created. The config from`config/dev.js` will be used.

__npm run build:prod__<br>
Creates a production build in `dist/`, sources are minified and sourcemaps are
not created. The config from `config/prod.js` will be used.

[acc]: https://www.assettocorsa.net/competizione/
[dev]: http://localhost:8080
