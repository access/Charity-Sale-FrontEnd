import axios from "axios";
//import http from "http";

// const httpProxy = require('http-proxy');

// //
// // Create a proxy server with custom application logic
// //
// var proxy = httpProxy.createProxyServer({target: 'http://localhost:60558'});
// proxy.listen(5050);
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
// var server = http.createServer(function (req, res) {
//   // You can define here your custom logic to handle the request
//   // and then proxy the request.
//   proxy.web(req, res, {  });
// });

//console.log("listening on port 5050")
//server.listen(5050);


axios.interceptors.request.use(
  config => {
    //console.log("axios config: ", config);

    // config.proxy = {
    //   protocol: 'http',
    //   host: 'localhost',
    //   port: 5050
    // }
    return config;
  },
  error => {
    Promise.reject(error)
  });

axios.interceptors.response.use((response) => {
  return response
}, function (error) {
  return Promise.reject(error);
});