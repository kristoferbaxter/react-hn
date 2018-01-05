## React Hacker News Example

See this application live at: https://react-hn.kristoferbaxter.com

This is an example of a PWA built using React, Webpack, and some small opinions.
*Please do not think of this as the way to build your application*. 
Instead, view this as an example of some concepts used in modern web applications (sw, h2, h2push).

Made with _kindness_ in California. 🏄

## Installation

1. Install yarn
    * https://yarnpkg.com/en/docs/install
2. Install h2o Proxy (to allow for local h2 and h2 push)
    * Depends on your OS. Tend to use 'brew' on MacOS -- 'brew update; brew install h2o'
    * Https certs will be installed automatically when you do yarn start.
3. Install Brotli and Zopfli CLI
    * Again, depends on your OS. Typically just use 'brew', 'brew update; brew install brotli; brew install zopfli'
    * https://github.com/google/brotli
    * https://github.com/google/zopfli
4. Install Yarn Dependencies
    * yarn install
5. Run Locally
    * yarn start (chrome only)
    * yarn bundle:prod; yarn run start (all browsers)
6. Access using your favorite browser
    * https://localhost:5443

## Details

I've focused mostly on first initial load performance, with the small caveat of using Webpack instead of Rollup. I'd like the route based code splitting to provide a extensible model for keeping initial view rendering costs low.

In the future there are plenty of things to do:
1. Move away from needlessly spamming the Firebase API (see src/restify/storage/*) and instead leverage the firebase client in the node server.
2. Write a Webpack plugin to allow for split css files based on packages.
3. Internationalization/Localization, including RTL layout.
4. Support AppCache (even though it's kind of a jerk)
5. Allow for posting comments!
6. FIX LOTS OF BUGS! ZOMG SO MANY BUGS!
