"use strict";

require("./helpers/setup");

var wd = require("wd"),
  actions = require("./helpers/actions"),
  ffactions = require("./util/ff_actions");

wd.addPromiseChainMethod('swipe', actions.swipe);

describe("ff exvius trust", function () {
  this.timeout(600000);
  var driver;
  var allPassed = true;

  before(function () {
    driver = ffactions.initDriver();
    return driver;
  });

  after(function () {
    return driver
      .quit();
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  it("should touch to start", function () {
    return ffactions.byPassStart(driver);
  });

  it("should tap to 世界", function () {
    return ffactions.tapWorldMap(driver);
  });

  it("should tap to 格蘭謝爾特", function () {
    var grand = new wd.TouchAction();
    grand.press({x: 800, y: 950}).release(); // 土之神殿:最深處
    return driver.performTouchAction(grand).sleep(3000);
  });

  it("should tap then swipe in 格蘭謝爾特島", function () {
    return ffactions.tapGranIsland(driver).swipe({
      startX: 800, endX: 1500,
      startY: 1350, endY: 1350,
      duration: 1000
    });
  });

  it("should tap to 土之神殿", function () {
    var earthShrine = new wd.TouchAction();
    earthShrine.press({x: 450, y: 1950}).release();
    return driver.performTouchAction(earthShrine).sleep(3000);
  });

  it("should tap to 土之神殿:最深處", function () {
    var earthShrineDeepest = new wd.TouchAction();
    earthShrineDeepest.press({x: 800, y: 1350}).release(); // 土之神殿:最深處
    return driver.performTouchAction(earthShrineDeepest).sleep(3000);
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
    //return swipeBottom().performTouchAction(noFriend).sleep(3000);
    return driver.performTouchAction(noFriend).sleep(3000);
  });

  it("should tap 出發", function () {
    return ffactions.tapDepart(driver);
  });

  it("should tap AUTO", function () {
    return ffactions.tapAuto(driver, 100000);
  });

  it("should tap NEXT all the way post reward finish", function () {
    return ffactions.finishReward(driver);
  });
});
