'use strict';

// UI Imports
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
// UI Components
import RoutedView from '../../core/routedView.js';
import LoadingView from '../../core/loadingView.js';

function defaultRoute(req, res, next) {  
  const supportsManifest = req.userAgentClassifiction === 'chrome';
  const resources = req.resources;

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Connection': 'Transfer-Encoding',
    'Transfer-Encoding': 'chunked',
    'Strict-Transport-Security': 'max-age=31557600; includeSubDomains; preload',
    'Timing-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*'
  });

  res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <title>React Hacker News</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5" />
      ${supportsManifest ? '<meta name="theme-color" content="#0077B5" />' : ''}
      <style>${resources.inline}</style>
      ${resources.inline === null && resources.css !== null ? '<link rel="stylesheet" href="' + resources.css + '" />' : ''}
      ${supportsManifest ? '<link rel="manifest" href="/dist/chrome/manifest.json" />' : ''}
      <link rel="icon" href="/static/icons/favicon.png">
      <script src='${resources.js}' async defer></script>
    </head>
    <body>
      <div id="mount">`);

  const RoutedViewComponent = ReactDOMServer.renderToString(
    <div id="mount">
      <StaticRouter location={req.url} context={{}}>
        <div>
          <RoutedView delay={0}>
            <LoadingView/>
          </RoutedView>  
        </div>
      </StaticRouter>
    </div>
  );

  res.write(`
        ${RoutedViewComponent}
        </div>
      </body>
    </html>`);

  res.end();

  next();
}

module.exports = defaultRoute;
