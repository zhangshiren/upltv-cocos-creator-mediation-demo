
var upltv = require("UPLTV").upltv;
cc.bridgeInterface = require("UPLTV").bridgeInterface;

cc.Class({
    extends: cc.Component,

    properties: {
        //初始化相关
        initSdk: cc.Button,
        initSDKByCall: cc.Button,
        initGDPR: cc.Button,

        //ABTest相关
        initABTest: cc.Button,
        getABConfig: cc.Button,

        //激励视频相关
        rdDebugUI: cc.Button,
        rdLoadCall: cc.Button,
        rdIsReady: cc.Button,
        rdShow: cc.Button,

        rewardPlaceId: "rewardID",

        //插屏相关
        ILDebugUI: cc.Button,
        ILLoadCall: cc.Button,
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
        setIsChild: cc.Button,

        label: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

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
    initSDKFunc: function() {
        var self = this;
        this.initSdk.node.on('click', function (event) {
            upltv.intSdk(0);
            self.label.string = "广告初始化成功";
        });

        this.initSDKByCall.node.on('click', function (event) {
            self.label.string = "广告初始化";
            upltv.intSdk(0, function (r) {
                cc.log("===> js intSdk result:, %s", r);
                self.label.string = "js intSdk result:" + r;
            });
        });

        this.IsLogOpened.node.on("click", function(i) {
            var b = upltv.isLogOpened();
            cc.log("===> js IsLogOpened result:, %s", b);
            self.label.string = "js IsLogOpened result:" + b;
        });

        //初始化之后调用
        this.setIsChild.node.on("click", function(i) {
            var b = upltv.setIsChild(true);
            cc.log("===> js setIsChild result:, %s", b);
            self.label.string = "js setIsChild true";
        });

        this.initGDPR.node.on('click', function (event) {
            cc.log("===> js GDPR start");
            var e = upltv.getAccessPrivacyInfoStatus();
            cc.log("=====> js getAccessPrivacyInfoStatus status: %d ", e);
            if (e==upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown)
            {
                upltv.isEuropeanUnionUser(function(result){
                    if(result){
                        upltv.notifyAccessPrivacyInfoStatus(function(value){
                            cc.log("=====> js notifyAccessPrivacyInfoStatusCallBack callback: %d ",  value);
                            upltv.intSdk(0, function (r) {
                                cc.log("===> js intSdk result:, %s", r);
                                self.label.string = "js intSdk result:" + r;
                            });
                        });
                    }else{
                        upltv.intSdk(0, function (r) {
                            cc.log("===> js intSdk result:, %s", r);
                            self.label.string = "js intSdk result:" + r;
                        });
                    }
                });
            } else {
                upltv.intSdk(0, function (r) {
                    cc.log("===> js intSdk result:, %s", r);
                    self.label.string = "js intSdk result:" + r;
                });
            }
        });
    },

    //ABTest相关
    abTestFunc: function() {
        var self = this;
        this.initABTest.node.on('click', function (event) {
            upltv.initAbtConfigJson("u89731", true, 0, "Facebook", "M", -1, ["This is the first element.", "The second one.", "The last one."]);
            self.label.string = "ABTest初始化成功";
        });

        this.getABConfig.node.on('click', function (event) {
            var r = upltv.getAbtConfig("pass");
            cc.log("===> js getAbtConfig rr 3333: %s", r);
            self.label.string = "js getAbtConfig ：" + r;
        });
    },
    //激励视频相关
    rewardViedoFunc: function() {
        var self = this;
        this.rdDebugUI.node.on('click', function (event) {
            upltv.showRewardDebugUI();
        });

        this.rdLoadCall.node.on('click', function (event) {
            upltv.setRewardVideoLoadCallback(function(cpid, msg){
                cc.log("===> js RewardVideo LoadCallback Success at: %s", cpid);
                self.label.string = "js RewardVideo LoadCallback Success at:" + cpid;
            }, function(cpid, msg){
                cc.log("===> js RewardVideo LoadCallback Fail at: %s", cpid);
                self.label.string = "js RewardVideo LoadCallback Fail at:" + cpid;
            });
        });

        this.rdIsReady.node.on('click', function (event) {
            var r = upltv.isRewardReady();
            cc.log("===> js isRewardReady r: %s", r.toString());
            self.label.string = "js isRewardReady: " + r.toString();
        });

        this.rdShow.node.on('click', function (event) {
            upltv.setRewardVideoShowCallback(function(type, cpid){
                var event = "unkown";
                if (type == upltv.AdEventType.VIDEO_EVENT_DID_SHOW) {
                    event = "Did_Show";
                }
                else if (type == upltv.AdEventType.VIDEO_EVENT_DID_CLICK) {
                    event = "Did_Click";
                }
                else if (type == upltv.AdEventType.VIDEO_EVENT_DID_CLOSE) {
                    event = "Did_Close";
                }else if (type == upltv.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD) {
                    event = "Did_Given_Reward";
                }else if (type == upltv.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD) {
                    event = "Did_Abandon_Reward";
                }
                cc.log("===> js RewardVideo Show Callback, event: %s, at: %s", event, cpid);

                self.label.string = "js RewardVideo Show Callback: " + event;
            });

            var r = upltv.isRewardReady();
            cc.log("===> js isRewardReady r: %s", r);
            self.label.sting = "js isRewardReady r:" + r;
            if (r == true) {
                cc.log("===> js showRewardVideo call");
                self.label.string = "js showRewardVideo 成功";
                upltv.showRewardVideo(self.rewardPlaceId);
            }

        });
    },

    //插屏相关
    ilViewFunc: function() {
        var self = this;
        this.ILDebugUI.node.on('click', function (event) {
            upltv.showInterstitialDebugUI();
        });

        this.ILLoadCall.node.on('click', function (event) {
            upltv.setInterstitialLoadCallback(self.ilPlaceId,
                function(cpid, msg){
                    cc.log("===> js il load callback success: %s at placementid:%s", msg, cpid);
                    self.label.string = "js il load callback success: " + cpid;
                },
                function(cpid, msg){
                    cc.log("===> js il load callback fail: %s at placementid:%s", msg, cpid);
                    self.label.string = "js il load callback fail: " + cpid;
                });
        });

        this.ILIsReady.node.on('click', function (event) {
            upltv.isInterstitialReadyAsyn(self.ilPlaceId, function(r){
                cc.log("===> js il ad isreadyasyn: %s at placementid:%s", r, self.ilPlaceId);
                self.label.string = "js il ad isreadyasyn: " + self.ilPlaceId;
            });
        });

        this.ILShow.node.on('click', function (event) {
            upltv.setInterstitialShowCallback(self.ilPlaceId,
                function(type, cpid){
                    var event = "unkown";
                    if (type == upltv.AdEventType.INTERSTITIAL_EVENT_DID_SHOW) {
                        event = "Did_Show";
                    }
                    else if (type == upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLICK) {
                        event = "Did_Click";
                    }
                    else if (type == upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE) {
                        event = "Did_Close";
                    }
                    cc.log("===> js il ad event: %s, at placementid: %s", event, cpid);
                    self.label.string = "gagah gjahga aghajfgha gjahfgjha jkgahg agjkahga js il ad event: " + event;
                }
            );

            var r = upltv.isInterstitialReady(self.ilPlaceId);
            cc.log("===> js il ad isready: %s at placementid:%s", r, self.ilPlaceId);
            self.label.string = "js il ad isready: " + self.ilPlaceId;
            if (r == true) {
                upltv.showInterstitialAd(self.ilPlaceId);
                self.label.string = "插屏展示成功";
            }


        });
    },
    //Banner相关
    bannerViewFunc: function() {
        var self = this;
        this.showTopBanner.node.on('click', function (event) {
            upltv.setBannerShowCallback(self.bannerPlaceId,
                function (type, cpadid) {
                    var event = "unkown";
                    if (type == upltv.AdEventType.BANNER_EVENT_DID_SHOW) {
                        event = "Did_Show";
                    }
                    else if (type == upltv.AdEventType.BANNER_EVENT_DID_CLICK) {
                        event = "Did_Click";
                    }
                    else if (type == upltv.AdEventType.BANNER_EVENT_DID_REMOVED) {
                        event = "Did_Removed";
                    }
                    cc.log("=====> banner event: %s, at : %s" , event, cpadid);
                    self.label.string = "banner event: " + cpadid;
                });

            upltv.showBannerAdAtTop(self.bannerPlaceId);
            self.label.string = "顶部Banner展示";
        });

        this.showBottomBanner.node.on('click', function (event) {
            upltv.setBannerShowCallback(self.bannerPlaceId,
                function (type, cpadid) {
                    var event = "unkown";
                    if (type == upltv.AdEventType.BANNER_EVENT_DID_SHOW) {
                        event = "Did_Show";
                    }
                    else if (type == upltv.AdEventType.BANNER_EVENT_DID_CLICK) {
                        event = "Did_Click";
                    }
                    else if (type == upltv.AdEventType.BANNER_EVENT_DID_REMOVED) {
                        event = "Did_Removed";
                    }
                    cc.log("=====> banner event: %s, at : %s" , event, cpadid);
                    self.label.string = "banner event: " + cpadid;
                });

            upltv.showBannerAdAtBottom(self.bannerPlaceId);
            self.label.string = "底部Banner展示";
        });

        this.hideAllBanner.node.on('click', function (event) {
            upltv.hideBannerAdAtTop();
            upltv.hideBannerAdAtBottom();
            self.label.string = "隐藏展示";
        });

        this.removeAllBanner.node.on('click', function (event) {
            upltv.removeBannerAdAt(self.bannerPlaceId);
            self.label.string = "移除展示";
        });
    },

    // called every frame
    update: function (dt) {

    },
});
