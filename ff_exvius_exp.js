"use strict";

require("./helpers/setup");

var wd = require("wd"),
  actions = require("./helpers/actions"),
  ffactions = require("./util/ff_actions");

wd.addPromiseChainMethod('swipe', actions.swipe);

describe("ff exvius exp", function () {
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

  it("should tap to 次元夾縫", function () {
    return ffactions.tapDimensionCrack(driver);
  });

  it("should tap to 慾望夾縫", function () {
    var desireCrack = new wd.TouchAction();
    desireCrack.press({x: 800, y: 700}).release();
    //desireCrack.press({x: 800, y: 1350}).release();
    return driver.performTouchAction(desireCrack).sleep(3000);
  });

  xit("should tap to 經驗之間", function () {
    var awakenRoom = new wd.TouchAction();
    //awakenRoom.press({x: 800, y: 1550}).release(); // 覺醒之間
    awakenRoom.press({x: 800, y: 2300}).release(); // 經驗之間
    return driver.performTouchAction(awakenRoom).sleep(3000);
  });

  it("should tap to 覺醒之間-中級", function () {
    var awakenRoomMidTier = new wd.TouchAction();
    awakenRoomMidTier.press({x: 800, y: 1350}).release(); // 中級
    //awakenRoomMidTier.press({x: 800, y: 1750}).release(); // 上級
    return driver.performTouchAction(awakenRoomMidTier).sleep(3000);
  });

  it("should scroll to bottom and press 無同行者並出發", function () {
    return ffactions.swipeAndTapNoPartner(driver);
  });

  it("should tap 出發", function () {
    return ffactions.tapDepart(driver);
  });

  it("should tap AUTO", function () {
    return ffactions.tapAuto(driver, 300000);
  });

  it("should tap NEXT all the way post reward finish", function () {
    return ffactions.finishReward(driver);
  });
});