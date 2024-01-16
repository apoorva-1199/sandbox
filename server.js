import express from 'express';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from './createEmotionCache';
import theme from './theme';
import path from "path";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import routeList from "./RoutesList";
import AppRoutes from './AppRoutes';

function renderFullPage(html, css, context) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="" />
        ${css}
      </head>
      <script type="text/javascript">
      window.__INITIAL_STATE__ = ${context};
      </script>
      <body>
        <script async src="build/bundle.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

function handleRender(req, res) {

  // set up our initial context passed through the router
  const context = { initialState: {} };
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
  // handle favicon.ico, it matches my weak route /:id
  if (req.url === "/favicon.ico") {
    return res.status(404).send("Favicon not found!");
  }
  // find the route that matches
  // then fire off any getInitialState function if it exists
  const dataPromises = routeList
    .map(route => {
      const match = matchPath(route, req.url);
      if (match && route.component.getInitialState) {
        return route.component.getInitialState(match.params);
      } else {
        return null;
      }
    })
    .filter(p => p !== null);

  Promise.all(dataPromises).then(initialStateList => {
    context.initialState = initialStateList[0];
    // we pass the data result into SSR on the StaticRouter context
    const ssr = (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <StaticRouter context={context} location={req.url}>
            <AppRoutes theme={theme} />
          </StaticRouter>
        </ThemeProvider>
      </CacheProvider>
    );
    const dom = renderToString(ssr);
    // Grab the CSS from emotion
    const emotionChunks = extractCriticalToChunks(ssr);
    const emotionCss = constructStyleTagsFromChunks(emotionChunks);
    res.send(renderFullPage(dom, emotionCss, context.initialState));
  });
}

const app = express();

app.use('/build', express.static('build'));

const distPath = path.resolve("./build");
const indexPath = `${distPath}/index.html`;

app.get("/api/classDetails", (req, res) => {
  const classDetails = require("./jsons/classDetails");
  res.send(classDetails.default);
});

app.get("/api/tabDetails", (req, res) => {
  const tabDetails = require("./jsons/tabDetails");
  res.send(tabDetails.default);
});

app.get("/api/gradebookAnalytics", (req, res) => {
  const gradebookAnalytics = require("./jsons/gradebookAnalytics");
  res.send(gradebookAnalytics.default);
});
app.get("/api/studentListWithAnalytics", (req, res) => {
  const studentListWithAnalytics = require("./jsons/studentListWithAnalytics");
  res.send(studentListWithAnalytics.default);
});


// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${port}`);
});
