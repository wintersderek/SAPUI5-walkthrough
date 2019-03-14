"use strict"

const STATIC_CONTENT = "public";
const REQUEST_PORT = process.env.UI5LEARNING_PORT || 4000;

// Bring in the required Node.js modules
const express = require("express");

let corsProxy = require("cors-anywhere").createServer({
    originBlacklist: [],
    originWhitelist: [],
    //requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
    redirectSameOrigin: true,
    httpProxyOptions: {
        xfwd: false
    }
});

// Set up the application
const app = express();

// Setup express to use the CORS proxy
app.get("/proxy/:proxyUrl*", function(req, res) {
    //console.log("Proxy Request Recieved");
    //resp.setHeader("derek_value", "here");
    //resp.end();
    req.url = req.url.replace("/proxy/", "/");
    corsProxy.emit("request", req, res);
});
app.post("/proxy/:proxyUrl*", function(req, res) {
    //console.log("Proxy Request Recieved");
    //resp.setHeader("derek_value", "here");
    //resp.end();
    req.url = req.url.replace("/proxy/", "/");
    corsProxy.emit("request", req, res);
});

// Setup express to serve static content from ./public
app.use(express.static(STATIC_CONTENT));

const server = app.listen(REQUEST_PORT, function() {
    console.log("Listening on port 4000!");
    //console.log(process.env)
});



