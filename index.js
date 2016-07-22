"use strict";

var later = require('later');
var exec = require('child_process').exec;

// set run schedule here...
var sched = later.parse.recur().on(31).minute();
later.setInterval(runExp, sched);

console.log("Init index.js at;" + new Date());
console.log("Next run is scheduled at;" + later.schedule(sched).next(1));

function runExp() {
  // start appium
  console.log("Appium started at;", new Date());
  var appiumProcess = exec('/home/jeffreychang/npm-global/bin/appium', {
    shell: "bash",
    env: {"ANDROID_HOME": "/home/jeffreychang/Android/Sdk"}
  }, function (err, stdout, stderr) {
    console.log("Appium stopped at;", new Date());
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
    exec('npm test', {cwd: currentDir, shell: "bash"}, function (err, stdout, stderr) {
      if (err instanceof Error) {
        appiumProcess.kill('SIGTERM');
        process.stderr.write(stderr);
        process.stdout.write(stdout);
        throw err;
      }
      process.stderr.write(stderr);
      process.stdout.write(stdout);

      console.log("Completed ff_exvius_exp.js at;" + new Date());
      console.log("Next run is scheduled at;" + later.schedule(sched).next(1));
      appiumProcess.kill('SIGTERM');
    });
  }, 5000);
};