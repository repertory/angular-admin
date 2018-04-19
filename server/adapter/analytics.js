const rest = require('parse-server/lib/rest');

class Analytics {
  /*
   @param parameters: the analytics request body, analytics info will be in the dimensions property
   @param req: the original http request
   */
  appOpened(parameters, req) {
    req.body.eventId = 'appOpened';
    req.body.user = req.auth.user ? req.auth.user.id : null;
    req.body.installationId = req.info.installationId || null;
    req.body.clientSDK = req.info.clientSDK || null;
    req.body.ip = this.getClientIp(req);
    return rest.create(req.config, req.auth, 'Event', req.body, req.info.clientSDK);
  }

  /*
   @param eventName: the name of the custom eventName
   @param parameters: the analytics request body, analytics info will be in the dimensions property
   @param req: the original http request
   */
  trackEvent(eventName, parameters, req) {
    req.body.eventId = eventName;
    req.body.user = req.auth.user ? req.auth.user.id : null;
    req.body.installationId = req.info.installationId || null;
    req.body.clientSDK = req.info.clientSDK || null;
    req.body.ip = this.getClientIp(req);
    return rest.create(req.config, req.auth, 'Event', req.body, req.info.clientSDK);
  }

  /**
   * 获取ip
   * @param req
   * @returns {*}
   */
  getClientIp(req) {
    if (req.headers['x-forwarded-for']) {
      // try to get from x-forwared-for if it set (behind reverse proxy)
      return req.headers['x-forwarded-for'].split(',')[0];
    } else if (req.connection && req.connection.remoteAddress) {
      // no proxy, try getting from connection.remoteAddress
      return req.connection.remoteAddress;
    } else if (req.socket) {
      // try to get it from req.socket
      return req.socket.remoteAddress;
    } else if (req.connection && req.connection.socket) {
      // try to get it form the connection.socket
      return req.connection.socket.remoteAddress;
    } else {
      // if non above, fallback.
      return req.ip || null;
    }
  }
}

module.exports.Analytics = Analytics;
module.exports.default = Analytics;
