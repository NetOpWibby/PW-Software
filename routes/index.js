/* jshint undef: true, unused: true, esversion: 6, node: true */
/* global require, module */

"use strict";



//
//  G E T
//  P A C K A G E S

const
  express = require("express"),
  router = express.Router();



//
//  C U S T O M
//  H E A D E R

router.use((req, res, next) => {
  res.header("X-Powered-By", "PW Software");
  next();
});



//
//  G E T
//  H O M E P A G E

router.get("/", (req, res) => {
  res.render("index", { layout: "layouts/default", title: "PW Software · Paul Anthony Webb's home on the 'Net" });
});



//
//  G E T
//  P A G E

router.get("/:page", (req, res) => {
  res.render("pages/" + req.params.page, Object.assign({ layout: "layouts/default", title: "PW Software · Paul Webb's home on the 'Net" }));
});



//
//  B E G I N

module.exports = router;
