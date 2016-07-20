"use strict";

var later = require('later');
var exec = require('exec');

// set run schedule here...
var sched = later.parse.recur().on(30).minute();
later.setInterval(runCollectUpgradeItems, sched);

console.log("Next run is scheduled at;" + later.schedule(sched).next(1));
console.log("Init index.js at;" + new Date());

function runCollectUpgradeItems() {
  // exec npm test
  exec(['npm', 'test'], function (err, out, code) {
    if (err instanceof Error)
      throw err;
    process.stderr.write(err);
    process.stdout.write(out);

    console.log("Completed ff_exvius.js at;" + new Date());
    console.log("Next run is scheduled at;" + later.schedule(sched).next(1));

    process.exit(code);
  });
};