const {ParseServer} = require('parse-server');
const express = require('express');
const path = require('path');
const fs = require('fs');
const {CONFIG} = require('../script/config');
const app = express();

if (CONFIG.server.dashboard.status) {
  const ParseDashboard = require('parse-dashboard');
  const dashboard = Object.assign(CONFIG.dashboard, {apps: [CONFIG.app]});
  app.use(CONFIG.server.dashboard.path, new ParseDashboard(dashboard, CONFIG.server.dashboard.options));
}

app.use(CONFIG.server.path, new ParseServer(CONFIG.app));

if (![CONFIG.server.path, CONFIG.server.dashboard.path].find(path => path === '/')) {
  const public = path.join(path.dirname(__dirname), 'data', 'public');
  const index = path.join(public, 'index.html');
  app.use('/', express.static(public));
  app.get('**', (req, res, next) => fs.existsSync(index) ? res.sendFile(index) : next()); // html5Mode伪静态
}

const {createServer} = require(CONFIG.server.https.status ? 'https' : 'http');
const server = !CONFIG.server.https.status ? createServer(app) : createServer({
  key: fs.readFileSync(CONFIG.server.https.key),
  cert: fs.readFileSync(CONFIG.server.https.cert),
}, app);

server.listen(CONFIG.server.port, () => {
  console.log('Server running on port ' + CONFIG.server.port);
});

if (CONFIG.app.liveQuery.redisURL) {
  ParseServer.createLiveQueryServer(server, {redisURL: CONFIG.app.liveQuery.redisURL});
} else {
  ParseServer.createLiveQueryServer(server);
}
