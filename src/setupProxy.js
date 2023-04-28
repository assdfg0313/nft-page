// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/jsons", {
      target: process.env.REACT_APP_JSON_URL,
      changeOrigin: true,
      pathRewrite: {
        "/jsons": "/",
      },
    })
  );
};
