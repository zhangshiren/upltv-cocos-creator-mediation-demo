(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HelloWorld.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd92acejs95ELLuigN2QigjN', 'HelloWorld', __filename);
// Script/HelloWorld.js

"use strict";

var openup = require("OpenUpSDK").openup;
cc.bridgeInterface = require("OpenUpSDK").bridgeInterface;

cc.Class({
    extends: cc.Component,

    properties: {
        //初始化相关
        initSdk: cc.Button,
        oneKeyInspect: cc.Button,
        initGDPR: cc.Button,

        //ABTest相关
        initABTest: cc.Button,
        getABConfig: cc.Button,

        //激励视频相关
        rdLoadCall: cc.Button,
        rdShowCall: cc.Button,
        rdIsReady: cc.Button,
        rdShow: cc.Button,

        rewardPlaceId: "rewardID",
        androidAppKey: "3db370851fa6",
        iosAppKey: "888889",

        //插屏相关
        ILLoadCall: cc.Button,
        ILShowCall: cc.Button,
        ILIsReady: cc.Button,
        ILShow: cc.Button,

        ilPlaceId: "sample_inter",

        //Banner相关
        showTopBanner: cc.Button,
        showBottomBanner: cc.Button,
        hideAllBanner: cc.Button,
        removeAllBanner: cc.Button,

        bannerPlaceId: "sample_banner",

        IsLogOpened: cc.Button,
        bannerCall: cc.Button,

        label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        //初始化相关
        this.initSDKFunc();

        //ABTest相关s
        this.abTestFunc();

        //激励视频相关
        this.rewardViedoFunc();

        //插屏相关
        this.ilViewFunc();

        //Banner相关
        this.bannerViewFunc();
    },

    //初始化相关
    initSDKFunc: function initSDKFunc() {
        var self = this;
        this.initSdk.node.on('click', function (event) {
            cc.log("===> js intSdk result");
            openup.initSdk(self.androidAppKey, self.iosAppKey, 0, function (r) {
                self.label.string = "js intSdk result:" + r;
                cc.log("===> js intSdk result:, %s", r);
            });
        });

        this.oneKeyInspect.node.on('click', function (event) {
            self.label.string = "autoOneKeyInspect clicked";
            openup.autoOneKeyInspect();
        });

        this.IsLogOpened.node.on("click", function (i) {
            var b = openup.isLogOpened();
            cc.log("===> js IsLogOpened result:, %s", b);
            self.label.string = "js IsLogOpened result:" + b;
        });

        this.initGDPR.node.on('click', function (event) {
            cc.log("===> js GDPR start");
            var e = openup.getAccessPrivacyInfoStatus();
            cc.log("=====> js getAccessPrivacyInfoStatus status: %d ", e);
            if (e == openup.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown) {
                openup.isEuropeanUnionUser(function (result) {
                    if (result) {
                        openup.notifyAccessPrivacyInfoStatus(function (value) {
                            cc.log("=====> js notifyAccessPrivacyInfoStatusCallBack callback: %d ", value);
                            openup.initSdk(self.androidAppKey, self.iosAppKey, 0, function (r) {
                                cc.log("===> js intSdk result:, %s", r);
                                self.label.string = "js intSdk result:" + r;
                            });
                        });
                    } else {
                        openup.initSdk(self.androidAppKey, self.iosAppKey, 0, function (r) {
                            cc.log("===> js intSdk result:, %s", r);
                            self.label.string = "js intSdk result:" + r;
                        });
                    }
                });
            } else {
                openup.initSdk(self.androidAppKey, self.iosAppKey, 0, function (r) {
                    cc.log("===> js intSdk result:, %s", r);
                    self.label.string = "js intSdk result:" + r;
                });
            }
        });
    },

    //ABTest相关
    abTestFunc: function abTestFunc() {
        var self = this;
        this.initABTest.node.on('click', function (event) {
            openup.initAbtConfigJson("u89731", true, 0, "Facebook", "M", -1, ["This is the first element.", "The second one.", "The last one."]);
            self.label.string = "ABTest初始化成功";
        });

        this.getABConfig.node.on('click', function (event) {
            var r = openup.getAbtConfig("pass");
            cc.log("===> js getAbtConfig rr 3333: %s", r);
            self.label.string = "js getAbtConfig ：" + r;
        });
    },
    //激励视频相关
    rewardViedoFunc: function rewardViedoFunc() {
        var self = this;
        this.rdShowCall.node.on('click', function (event) {
            openup.setRewardVideoShowCallback(function (type, cpid) {
                var event = "unkown";
                if (type == openup.AdEventType.VIDEO_EVENT_WILL_SHOW) {
                    event = "Will_Show";
                } else if (type == openup.AdEventType.VIDEO_EVENT_DID_SHOW) {
                    event = "Did_Show";
                } else if (type == openup.AdEventType.VIDEO_EVENT_DID_CLICK) {
                    event = "Did_Click";
                } else if (type == openup.AdEventType.VIDEO_EVENT_DID_CLOSE) {
                    event = "Did_Close";
                } else if (type == openup.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD) {
                    event = "Did_Given_Reward";
                } else if (type == openup.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD) {
                    event = "Did_Abandon_Reward";
                }
                cc.log("===> js RewardVideo Show Callback, event: %s, at: %s", event, cpid);

                self.label.string = "js RewardVideo Show Callback: " + event;
            });
        });

        this.rdLoadCall.node.on('click', function (event) {
            openup.setRewardVideoLoadCallback(function (cpid, msg) {
                cc.log("===> js RewardVideo LoadCallback Success at: %s", cpid);
                self.label.string = "js RewardVideo LoadCallback Success at:" + cpid;
            }, function (cpid, msg) {
                cc.log("===> js RewardVideo LoadCallback Fail at: %s", cpid);
                self.label.string = "js RewardVideo LoadCallback Fail at:" + cpid;
            });
        });

        this.rdIsReady.node.on('click', function (event) {
            var r = openup.isRewardReady();
            cc.log("===> js isRewardReady r: %s", r.toString());
            self.label.string = "js isRewardReady: " + r.toString();
        });

        this.rdShow.node.on('click', function (event) {
            var r = openup.isRewardReady();
            cc.log("===> js isRewardReady r: %s", r);
            self.label.sting = "js isRewardReady r:" + r;
            if (r == true) {
                cc.log("===> js showRewardVideo call");
                self.label.string = "js showRewardVideo 成功";
                openup.showRewardVideo(self.rewardPlaceId);
            }
        });
    },

    //插屏相关
    ilViewFunc: function ilViewFunc() {
        var self = this;
        this.ILShowCall.node.on('click', function (event) {
            openup.setInterstitialShowCallback(self.ilPlaceId, function (type, cpid) {
                var event = "unkown";
                if (type == openup.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW) {
                    event = "Will_Show";
                } else if (type == openup.AdEventType.INTERSTITIAL_EVENT_DID_SHOW) {
                    event = "Did_Show";
                } else if (type == openup.AdEventType.INTERSTITIAL_EVENT_DID_CLICK) {
                    event = "Did_Click";
                } else if (type == openup.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE) {
                    event = "Did_Close";
                }
                cc.log("===> js il ad event: %s, at placementid: %s", event, cpid);
                self.label.string = "gagah gjahga aghajfgha gjahfgjha jkgahg agjkahga js il ad event: " + event;
            });
        });

        this.ILLoadCall.node.on('click', function (event) {
            openup.setInterstitialLoadCallback(self.ilPlaceId, function (cpid, msg) {
                cc.log("===> js il load callback success: %s at placementid:%s", msg, cpid);
                self.label.string = "js il load callback success: " + cpid;
            }, function (cpid, msg) {
                cc.log("===> js il load callback fail: %s at placementid:%s", msg, cpid);
                self.label.string = "js il load callback fail: " + cpid;
            });
        });

        this.ILIsReady.node.on('click', function (event) {
            openup.isInterstitialReadyAsyn(self.ilPlaceId, function (r) {
                cc.log("===> js il ad isreadyasyn: %s at placementid:%s", r, self.ilPlaceId);
                self.label.string = "js il ad isreadyasyn: " + self.ilPlaceId;
            });
        });

        this.ILShow.node.on('click', function (event) {
            var r = openup.isInterstitialReady(self.ilPlaceId);
            cc.log("===> js il ad isready: %s at placementid:%s", r, self.ilPlaceId);
            self.label.string = "js il ad isready: " + self.ilPlaceId;
            if (r == true) {
                openup.showInterstitialAd(self.ilPlaceId);
                self.label.string = "插屏展示成功";
            }
        });
    },
    //Banner相关
    bannerViewFunc: function bannerViewFunc() {
        var self = this;
        this.bannerCall.node.on('click', function (event) {
            openup.setBannerShowCallback(self.bannerPlaceId, function (type, cpadid) {
                var event = "unkown";
                if (type == openup.AdEventType.BANNER_EVENT_DID_SHOW) {
                    event = "Did_Show";
                } else if (type == openup.AdEventType.BANNER_EVENT_DID_CLICK) {
                    event = "Did_Click";
                } else if (type == openup.AdEventType.BANNER_EVENT_DID_REMOVED) {
                    event = "Did_Removed";
                }
                cc.log("=====> banner event: %s, at : %s", event, cpadid);
                self.label.string = "banner event: " + cpadid;
            });
        });
        this.showTopBanner.node.on('click', function (event) {
            openup.showBannerAdAtTop(self.bannerPlaceId);
            self.label.string = "顶部Banner展示";
        });

        this.showBottomBanner.node.on('click', function (event) {
            openup.showBannerAdAtBottom(self.bannerPlaceId);
            self.label.string = "底部Banner展示";
        });

        this.hideAllBanner.node.on('click', function (event) {
            openup.hideBannerAdAtTop();
            openup.hideBannerAdAtBottom();
            self.label.string = "隐藏展示";
        });

        this.removeAllBanner.node.on('click', function (event) {
            openup.removeBannerAdAt(self.bannerPlaceId);
            self.label.string = "移除展示";
        });
    },

    // called every frame
    update: function update(dt) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HelloWorld.js.map
        