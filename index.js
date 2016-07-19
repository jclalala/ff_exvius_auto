"use strict";

var later = require('later');
var Mocha = require('mocha');

var textSched = later.parse.text('every ' + 1 + ' min');
later.setInterval(runCollectUpgradeItems, textSched);

function runCollectUpgradeItems() {
  var mocha = new Mocha();
  mocha.addFile("ff_exvius.js");
  mocha.run();
};