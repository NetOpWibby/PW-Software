/* jshint undef: true, unused: true, esversion: 6, node: true */
/* global require, __dirname, module */

"use strict";



//
//  G E T
//  P A C K A G E S

const
  bodyParser = require("body-parser"),
  chew = require("chewit"),
  compression = require("compression"),
  cookieParser = require("cookie-parser"),
  express = require("express"),
  favicon = require("serve-favicon"),
  hbs = require("hbs"),
  hbsutils = require("hbs-utils")(hbs),
  logger = require("morgan"),
  minifyHTML = require("express-minify-html"),
  routes = require("./routes");



//
//  P R O G R A M

const app = express()
  .set("view engine", "html")
  .engine("html", hbs.__express)
  .set("views", __dirname + "/views")
  .set("layouts", __dirname + "/views/layouts")

  .use(favicon(__dirname + "/public/favicon.ico"))

  .use(logger("dev"))
  .use(compression())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(__dirname + "/public"))
  .use(minifyHTML({
    override: true,
    htmlMinifier: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      keepClosingSlash: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      minifyJS: true
    }
  }))

  .use("/", routes)
  .use(chew("5ae8a846b13869077c37f621"));



//
//  P A R T I A L S

hbsutils.registerPartials(__dirname + "/views/partials");
hbsutils.registerWatchedPartials(__dirname + "/views/partials");



//
//  E R R O R
//  H A N D L I N G

if (typeof String.prototype.contains === "undefined") {
  String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
  };
}

if (typeof Array.prototype.contains === "undefined") {
  Array.prototype.contains = function (it) {
    for (let i in this) {
      const elem = this[i].toString();
      if (elem.contains(it)) return true;
    }

    return false;
  };
}

app.use((err, req, res, next) => {
  if (err && err.stack.contains("Failed to lookup view")) {
    res.render("pages/error", Object.assign({ layout: "layouts/default", title: "PW Software · Page Not Found", error: "This page doesn't exist" }));
  } else if (err) {
    res.render("pages/error", Object.assign({ layout: "layouts/default", title: "PW Software · Error", error: "There's been an error" }));
  }

  return next;
});



//
//  B E G I N

module.exports = app;
