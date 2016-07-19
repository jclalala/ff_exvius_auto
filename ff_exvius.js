"use strict";

require("./helpers/setup");

var wd = require("wd"),
  actions = require("./helpers/actions"),
  _ = require('underscore');

wd.addPromiseChainMethod('swipe', actions.swipe);

describe("ff exvius", function () {
  this.timeout(600000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = {
      host: 'localhost',
      port: 4723
    };
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = {
      browserName: '',
      'appium-version': '1.3',
      platformName: 'Android',
      platformVersion: '4.4.2',
      deviceName: 'Android Emulator',
      noReset: true, // do not install APP,
      newCommandTimeout: 600000, // next command timeout = 10 min
      app: undefined // will be set later
    };
    desired.app = "/home/jeffreychang/com.square_enix.android_googleplay.FFBEWW-1.apk";
    return driver
      .init(desired)
      .setImplicitWaitTimeout(3000);
  });

  after(function () {
    return driver
      .quit();
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("should touch to start", function () {
    var pressCenter = new wd.TouchAction();
    pressCenter.press({x: 800, y: 1200}).release();
    return driver.sleep(3000).performTouchAction(pressCenter).sleep(1000).performTouchAction(pressCenter).sleep(5000)
      .elementById("com.square_enix.android_googleplay.FFBEWW:id/webviewHolder").click().sleep(30000); // TODO: possible to wait for some element?
  });

  it("should tap to 次元夾縫", function () {
    var dimCrack = new wd.TouchAction();
    dimCrack.press({x: 1525, y: 1920}).release();
    return driver.performTouchAction(dimCrack).sleep(3000);
  });

  it("should tap to 慾望夾縫", function () {
    var desireCrack = new wd.TouchAction();
    desireCrack.press({x: 800, y: 700}).release();
    return driver.performTouchAction(desireCrack).sleep(3000);
  });

  it("should tap to 覺醒之間", function () {
    var awakenRoom = new wd.TouchAction();
    awakenRoom.press({x: 800, y: 1550}).release();
    return driver.performTouchAction(awakenRoom).sleep(3000);
  });

  it("should tap to 覺醒之間-中級", function () {
    var awakenRoomMidTier = new wd.TouchAction();
    awakenRoomMidTier.press({x: 800, y: 1350}).release();
    return driver.performTouchAction(awakenRoomMidTier).sleep(3000);
  });

  it("should scroll to bottom and press 無同行者並出發", function () {
    var swipeBottom = function () {
      var opts = {
        startX: 800, endX: 800,
        startY: 1350, endY: 100,
        duration: 1000
      };
      return driver.swipe(opts).swipe(opts).swipe(opts).swipe(opts).swipe(opts).swipe(opts).swipe(opts).swipe(opts).swipe(opts).swipe(opts);
    };
    var noFriend = new wd.TouchAction();
    noFriend.press({x: 800, y: 2450}).release();
    return swipeBottom().performTouchAction(noFriend).sleep(3000);
  });

  it("should tap 出發", function () {
    var depart = new wd.TouchAction();
    depart.press({x: 800, y: 2300}).release();
    return driver.performTouchAction(depart).sleep(10000);
  });

  it("should tap AUTO", function () {
    var auto = new wd.TouchAction();
    auto.press({x: 200, y: 2450}).release();
    return driver.performTouchAction(auto).sleep(300000); // let battle run for 3 min...
  });

  it("should tap NEXT all the way post reward finish", function () {
    var next = new wd.TouchAction();
    next.press({x: 800, y: 2300}).release();
    return driver.performTouchAction(next).sleep(3000).performTouchAction(next).sleep(3000).performTouchAction(next).sleep(3000);
  });
});
