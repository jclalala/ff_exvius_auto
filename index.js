"use strict";

var later = require('later');
var exec = require('child_process').exec;

// set run schedules here...
//var sched = later.parse.recur().on(0).minute();
var sched = later.parse.recur().every(5).minute();
later.setInterval(run, sched);

console.log("Init index.js at;" + new Date());
console.log("Next run is scheduled at;" + later.schedule(sched).next(1));

function run() {
  // start appium
  console.log("Appium started at;", new Date());
  var appiumProcess = exec('/home/jeffreychang/npm-global/bin/appium', {
    shell: "bash",
    env: {"ANDROID_HOME": "/home/jeffreychang/Android/Sdk"}
  }, function (err, stdout, stderr) {
    console.log(
      "Appium stopped at;", new Date());
  });

  appiumProcess.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  appiumProcess.stderr.on('data', function (data) {
    console.error(data.toString());
  });

  // exec npm test 5s after appium start
  setTimeout(function () {
    var currentDir = __dirname;
    exec('npm run trust', {cwd: currentDir, shell: "bash"}, function (err, stdout, stderr) {
      process.stderr.write(stderr);
      process.stdout.write(stdout);

      appiumProcess.kill('SIGTERM');

      if (err instanceof Error) {
        // do not throw error or else 'this' (index.js) node process will terminate
        // throw err;
        console.log("Job errored, trying again in 3s...");
        setTimeout(run, 3000);
        return;
      }

      console.log("Completed ff_exvius_exp.js at;" + new Date());
      console.log("Next run is scheduled at;" + later.schedule(sched).next(1));
    });
  }, 5000);
};

run();