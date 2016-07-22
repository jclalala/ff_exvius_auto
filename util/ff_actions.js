"use strict";

var wd = require("wd"),
  actions = require("../helpers/actions");

const ff_actions = {
  initDriver: function () {
    var serverConfig = {
      host: 'localhost',
      port: 4723
    };
    var driver = wd.promiseChainRemote(serverConfig);
    require("../helpers/logging").configure(driver);

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
  },
  byPassStart: function (driver) {
    var pressCenter = new wd.TouchAction();
    pressCenter.press({x: 800, y: 1200}).release();
    return driver.sleep(3000).performTouchAction(pressCenter).sleep(1000).performTouchAction(pressCenter).sleep(5000)
      .elementById("com.square_enix.android_googleplay.FFBEWW:id/webviewHolder").click().sleep(30000); // TODO: possible to wait for some element?
  },
  tapDimensionCrack: function (driver) {
    var dimCrack = new wd.TouchAction();
    dimCrack.press({x: 1525, y: 1920}).release();
    return driver.performTouchAction(dimCrack).sleep(3000);
  }
};

module.exports = ff_actions;