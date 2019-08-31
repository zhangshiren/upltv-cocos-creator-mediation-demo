"use strict";
cc._RF.push(module, 'b35dfmv1qtIaK8auM0v89p0', 'UPLTV');
// Script/UPLTV.js

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//在使用的地方添加以下两行代码即可
//var upltv = require("UPLTV").upltv;
//cc.bridgeInterface = require("UPLTV").bridgeInterface;

var upltvoc = require("UPLTVIos");
var upltva = require("UPLTVAndroid");

var isShowLog = false;

var printLog = function printLog(msg) {
    // cc.log("===> js call printJsLog() " + (upltv));
    // cc.log("===> js call printJsLog() " + (upltv.upltvbridge));
    if (undefined != msg && null != msg && isShowLog && upltv != undefined && upltv.upltvbridge != null) {
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            upltv.upltvbridge.printJsLog(msg);
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            upltv.upltvbridge.printJsLog(msg);
        }
    }
};

var isOnlineReportEnable = function isOnlineReportEnable() {
    if (upltv != undefined) {
        return upltv.isOnlineDebugReportEnable();
    } else {
        return false;
    }
};

var onlineReportCall = function onlineReportCall(name, msg, cpid) {
    if (upltv != undefined) {
        if (cpid != undefined) {
            upltv.onlineDebugReport(name, msg, cpid);
        } else {
            upltv.onlineDebugReport(name, msg);
        }
    }
};

var functionNames = {

    handleVokeParams: function handleVokeParams(params) {
        //printLog("===> js handleVokeParams: " + params);
        if (undefined == params || null == params || typeof params != "string") {
            return;
        }

        var startpos = params.indexOf(":");
        var substr = null;
        if (startpos <= 0) {
            return;
        }

        substr = params.substr(startpos + 1);
        var endpos = substr.indexOf(",");
        var callname = substr.substring(0, endpos);
        substr = substr.substr(endpos + 1);

        var cpadid = null;
        var message = null;
        startpos = substr.indexOf(":");
        if (startpos > 0) {
            substr = substr.substr(startpos + 1);
            endpos = substr.indexOf(",");
            if (endpos > 0) {
                cpadid = substr.substring(0, endpos);
                substr = substr.substr(endpos + 1);

                if (substr != null) {
                    startpos = substr.indexOf(":");
                    if (startpos > 0) {
                        message = substr.substr(startpos + 1);
                    }
                }
            }
        }

        if (isShowLog) {
            printLog("===> js handleVokeParams callname: " + callname);
            printLog("===> js handleVokeParams   cpadid: " + cpadid);
            printLog("===> js handleVokeParams  message: " + message);
        }
        //cc.log("===> js onlineDebugReport before function : %s", callname);
        var canreport = isOnlineReportEnable();
        if (canreport) {
            onlineReportCall(functionNames.Function_Receive_Callback, "CocosJs Receive message, callname:" + callname + ", cpadid:" + cpadid);
        }

        if (functionNames.Function_Reward_DidLoadFail == callname) {
            if (null != ltvMap.rewardLoadFailCall && typeof ltvMap.rewardLoadFailCall == "function") {
                ltvMap.rewardLoadFailCall(cpadid, message);
                ltvMap.resetRewardLoadCallback();
            } else {
                printLog("===> js rewardLoadFailCall is null or not function");
            }
        } else if (functionNames.Function_Reward_DidLoadSuccess == callname) {
            if (null != ltvMap.rewardLoadSuccessCall && typeof ltvMap.rewardLoadSuccessCall == "function") {
                ltvMap.rewardLoadSuccessCall(cpadid, message);
                ltvMap.resetRewardLoadCallback();
            } else {
                printLog("===> rewardLoadSuccessCall is null or not function");
            }
        } else if (functionNames.Function_Reward_WillOpen == callname) {
            var call = ltvMap.rewardShowCall;
            if (call != null && typeof call == "function") {
                call(upltv.AdEventType.VIDEO_EVENT_WILL_SHOW, cpadid);
                if (canreport) {
                    onlineReportCall(callname, "CocosJs did run callback on video willopen event.");
                }
            } else {
                if (canreport) {
                    onlineReportCall(callname, "CocosJs not run callback on video willopen event.");
                }
            }
        } else if (functionNames.Function_Reward_DidOpen == callname) {
            var call = ltvMap.rewardShowCall;
            if (call != null && typeof call == "function") {
                call(upltv.AdEventType.VIDEO_EVENT_DID_SHOW, cpadid);
                if (canreport) {
                    onlineReportCall(callname, "CocosJs did run callback on video shown event.");
                }
            } else {
                if (canreport) {
                    onlineReportCall(callname, "CocosJs not run callback on video shown event.");
                }
            }
        } else if (functionNames.Function_Reward_DidClick == callname) {
            var call = ltvMap.rewardShowCall;
            if (call != null && typeof call == "function") {
                call(upltv.AdEventType.VIDEO_EVENT_DID_CLICK, cpadid);
                if (canreport) {
                    onlineReportCall(callname, "CocosJs did run callback on video clicked event.");
                }
            } else {
                if (canreport) {
                    onlineReportCall(callname, "CocosJs not run callback on video clicked event.");
                }
            }
        } else if (functionNames.Function_Reward_DidClose == callname) {
            var call = ltvMap.rewardShowCall;
            if (call != null && typeof call == "function") {
                call(upltv.AdEventType.VIDEO_EVENT_DID_CLOSE, cpadid);
                if (canreport) {
                    onlineReportCall(callname, "CocosJs did run callback on video closed event.");
                }
            } else {
                if (canreport) {
                    onlineReportCall(callname, "CocosJs not run callback on video closed event.");
                }
            }
        } else if (functionNames.Function_Reward_DidGivien == callname) {
            var call = ltvMap.rewardShowCall;
            if (call != null && typeof call == "function") {
                call(upltv.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD, cpadid);
                if (canreport) {
                    onlineReportCall(callname, "CocosJs did run callback on video reward given event.");
                }
            } else {
                if (canreport) {
                    onlineReportCall(callname, "CocosJs not run callback on video reward given event.");
                }
            }
        } else if (functionNames.Function_Reward_DidAbandon == callname) {
            var call = ltvMap.rewardShowCall;
            if (call != null && typeof call == "function") {
                call(upltv.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD, cpadid);
                if (canreport) {
                    onlineReportCall(callname, "CocosJs did run callback on video reward cancel event.");
                }
            } else {
                if (canreport) {
                    onlineReportCall(callname, "CocosJs not run callback on video reward cancel event.");
                }
            }
        } else if (functionNames.Function_Interstitial_DidLoadFail == callname) {
            var k = cpadid + "_Interstitial";
            var v = ltvMap.get(k);
            if (null != v) {
                var call = v.interstitialLoadFailCall;
                if (null != call && typeof call == "function") {
                    call(cpadid, message);
                }
                ltvMap.remove(k);
                printLog("===> Interstitial_DidLoadFail at key:" + k);
            }
        } else if (functionNames.Function_Interstitial_DidLoadSuccess == callname) {
            var k = cpadid + "_Interstitial";
            var v = ltvMap.get(k);
            if (null != v) {
                var call = v.interstitialLoadSuccessCall;
                if (null != call && typeof call == "function") {
                    call(cpadid, message);
                } else {
                    printLog("===> interstitial_didloadsuccess call is null or non-function type at key:" + k);
                }
                ltvMap.remove(k);
            } else {
                printLog("===> interstitial_didloadsuccess v is null at key:" + k);
            }
        } else if (functionNames.Function_Interstitial_Willshow == callname) {
            var v = ltvMap.get(cpadid);
            var callReport = false;
            if (null != v) {
                var call = v.interstitialShowCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW, cpadid);
                    if (canreport) {
                        callReport = true;
                        onlineReportCall(callname, "CocosJs did run callback on il ad willshown event at " + cpadid, cpadid);
                    }
                }
            }
            if (canreport && callReport == false) {
                onlineReportCall(callname, "CocosJs not run callback on il ad willshown event at " + cpadid, cpadid);
            }
        } else if (functionNames.Function_Interstitial_Didshow == callname) {
            var v = ltvMap.get(cpadid);
            var callReport = false;
            if (null != v) {
                var call = v.interstitialShowCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.INTERSTITIAL_EVENT_DID_SHOW, cpadid);
                    if (canreport) {
                        callReport = true;
                        onlineReportCall(callname, "CocosJs did run callback on il ad shown event at " + cpadid, cpadid);
                    }
                }
            }
            if (canreport && callReport == false) {
                onlineReportCall(callname, "CocosJs not run callback on il ad shown event at " + cpadid, cpadid);
            }
        } else if (functionNames.Function_Interstitial_Didclose == callname) {
            var v = ltvMap.get(cpadid);
            var callReport = false;
            if (null != v) {
                var call = v.interstitialShowCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE, cpadid);
                    if (canreport) {
                        callReport = true;
                        onlineReportCall(callname, "CocosJs did run callback on il ad closed event at " + cpadid, cpadid);
                    }
                }
            }
            if (canreport && callReport == false) {
                onlineReportCall(callname, "CocosJs not run callback on il ad closed event at " + cpadid, cpadid);
            }
        } else if (functionNames.Function_Interstitial_Didclick == callname) {
            var v = ltvMap.get(cpadid);
            var callReport = false;
            if (null != v) {
                var call = v.interstitialShowCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLICK, cpadid);
                    if (canreport) {
                        callReport = true;
                        onlineReportCall(callname, "CocosJs did run callback on il ad clicked event at " + cpadid, cpadid);
                    }
                }
            }
            if (canreport && callReport == false) {
                onlineReportCall(callname, "CocosJs not run callback on il ad clicked event at " + cpadid, cpadid);
            }
        } else if (functionNames.Function_Banner_DidRemove == callname) {
            var v = ltvMap.get(cpadid);
            if (null != v) {
                var call = v.bannerEventCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.BANNER_EVENT_DID_REMOVED, cpadid);
                }
            }
            ltvMap.remove(cpadid);
        } else if (functionNames.Function_Banner_DidClick == callname) {
            var v = ltvMap.get(cpadid);
            if (null != v) {
                var call = v.bannerEventCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.BANNER_EVENT_DID_CLICK, cpadid);
                }
            }
        } else if (functionNames.Function_Banner_DidShow == callname) {
            var v = ltvMap.get(cpadid);
            if (null != v) {
                var call = v.bannerEventCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.BANNER_EVENT_DID_SHOW, cpadid);
                }
            }
        } else if (functionNames.Function_Icon_DidLoad == callname) {
            var v = ltvMap.get(cpadid);
            if (null != v) {
                var call = v.iconEventCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.ICON_EVENT_DID_LOAD, cpadid);
                }
            }
        } else if (functionNames.Function_Icon_DidLoadFail == callname) {
            var v = ltvMap.get(cpadid);
            if (null != v) {
                var call = v.iconEventCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.ICON_EVENT_DID_LOADFAIL, cpadid);
                }
            }
        } else if (functionNames.Function_Icon_DidShow == callname) {
            var v = ltvMap.get(cpadid);
            if (null != v) {
                var call = v.iconEventCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.ICON_EVENT_DID_SHOW, cpadid);
                }
            }
        } else if (functionNames.Function_Icon_DidClick == callname) {
            var v = ltvMap.get(cpadid);
            if (null != v) {
                var call = v.iconEventCall;
                if (null != call && typeof call == "function") {
                    call(upltv.AdEventType.ICON_EVENT_DID_CLICK, cpadid);
                }
            }
        } else {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                if (functionNames.Function_ExitAd_DidShow == callname) {
                    if (null != ltvMap.backPressedCall && typeof ltvMap.backPressedCall == "function") ltvMap.backPressedCall(upltv.AdEventType.EXITAD_EVENT_DID_SHOW, message);else printLog("===> backPressedCall is null or not function");
                } else if (functionNames.Function_ExitAd_DidClick == callname) {
                    if (null != ltvMap.backPressedCall && typeof ltvMap.backPressedCall == "function") ltvMap.backPressedCall(upltv.AdEventType.EXITAD_EVENT_DID_CLICK, message);else printLog("===> backPressedCall is null or not function");
                } else if (functionNames.Function_ExitAd_DidClickMore == callname) {
                    if (null != ltvMap.backPressedCall && typeof ltvMap.backPressedCall == "function") ltvMap.backPressedCall(upltv.AdEventType.EXITAD_EVENT_DID_CLICKMORE, message);else printLog("===> backPressedCall is null or not function");
                } else if (functionNames.Function_ExitAd_DidExit == callname) {
                    if (null != ltvMap.backPressedCall && typeof ltvMap.backPressedCall == "function") ltvMap.backPressedCall(upltv.AdEventType.EXITAD_EVENT_DID_EXIT, message);else printLog("===> backPressedCall is null or not function");
                } else if (functionNames.Function_ExitAd_DidCancel == callname) {
                    if (null != ltvMap.backPressedCall && typeof ltvMap.backPressedCall == "function") ltvMap.backPressedCall(upltv.AdEventType.EXITAD_EVENT_DID_CANCEL, message);else printLog("===> backPressedCall is null or not function");
                }
            }
        }
    }
};
functionNames.Function_Receive_Callback = "receive_callback";

functionNames.Function_Reward_WillOpen = "reward_willopen";
functionNames.Function_Reward_DidOpen = "reward_didopen";
functionNames.Function_Reward_DidClick = "reward_didclick";
functionNames.Function_Reward_DidClose = "reward_didclose";
functionNames.Function_Reward_DidGivien = "reward_didgiven";
functionNames.Function_Reward_DidAbandon = "reward_didabandon";

functionNames.Function_Interstitial_Willshow = "interstitial_willshow";
functionNames.Function_Interstitial_Didshow = "interstitial_didshow";
functionNames.Function_Interstitial_Didclose = "interstitial_didclose";
functionNames.Function_Interstitial_Didclick = "interstitial_didclick";

functionNames.Function_Banner_DidShow = "banner_didshow";
functionNames.Function_Banner_DidClick = "banner_didclick";
functionNames.Function_Banner_DidRemove = "banner_didremove";

functionNames.Function_Reward_DidLoadFail = "reward_didloadfail";
functionNames.Function_Reward_DidLoadSuccess = "reward_didloadsuccess";

functionNames.Function_Interstitial_DidLoadFail = "interstitial_didloadfail";
functionNames.Function_Interstitial_DidLoadSuccess = "interstitial_didloadsuccess";

functionNames.Function_ExitAd_DidShow = "exitad_didshow";
functionNames.Function_ExitAd_DidClick = "exitad_didclick";
functionNames.Function_ExitAd_DidClickMore = "exitad_didclickmore";
functionNames.Function_ExitAd_DidExit = "exitad_onexit";
functionNames.Function_ExitAd_DidCancel = "exitad_oncancel";

functionNames.Function_Icon_DidLoad = "icon_didload";
functionNames.Function_Icon_DidLoadFail = "icon_didloadfail";
functionNames.Function_Icon_DidShow = "icon_didshow";
functionNames.Function_Icon_DidClick = "icon_didclick";

var ltvMap = {
    map: new Object(),
    length: 0,
    // 激励视屏加载回调
    rewardLoadFailCall: null,
    rewardLoadSuccessCall: null,
    // 激励视屏展示回调
    rewardShowCall: null,
    // rewardLoadDidOpenCall    : null,
    // rewardLoadDidClickCall   : null,
    // rewardLoadDidCloseCall   : null,
    // rewardLoadDidGiveCall    : null,
    // rewardLoadDidAbandonCall : null,
    // android平台下定义
    backPressedCall: null,
    // backPressedDidShowCall   : null,
    // backPressedDidClickCall  : null,
    // backPressedDidExitCall   : null,
    // backPressedDidMoreCall   : null,
    // backPressedDidCancelCall : null,

    resetRewardLoadCallback: function resetRewardLoadCallback() {
        this.rewardLoadFailCall = null;
        this.rewardLoadSuccessCall = null;
    },

    size: function size() {
        return this.length;
    },

    put: function put(key, value) {

        if (!this.map['_' + key]) {
            ++this.length;
        }

        this.map['_' + key] = value;
    },

    remove: function remove(key) {
        if (this.map['_' + key]) {
            --this.length;
            return delete this.map['_' + key];
        } else {
            return false;
        }
    },

    exist: function exist(key) {
        return this.map['_' + key] ? true : false;
    },

    get: function get(key) {
        return this.map['_' + key] ? this.map['_' + key] : null;
    },

    print: function print() {
        var str = '';

        for (var each in this.map) {
            str += '/n' + each + '  Value:' + this.map[each];
        }
        printLog("===> js map : " + str);
        return str;
    },

    test: function test() {
        this.put('1', function () {});
        this.put('2', function (v) {
            cc.log("===> js map function call at 2, v type: %s", typeof v === "undefined" ? "undefined" : _typeof(v));
        });
        this.put('4', function () {});
        printLog("===> js map exist 1: " + this.exist('1'));
        printLog("===> js map exist 2: " + this.exist('3'));
        var value = this.get('2');
        if (value) {
            value("========================");
        }
        this.print();
        this.remove('1');
        this.remove('3');
        printLog("===> js map size: " + this.size());
    }
};

var loadJsBridgeObject = function loadJsBridgeObject() {
    if (cc.sys.os === cc.sys.OS_IOS && null != upltv) {
        if (undefined == upltv.upltvbridge || upltv.upltvbridge == null) {
            upltv.upltvbridge = upltvoc;;
        }
    } else if (cc.sys.os === cc.sys.OS_ANDROID && null != upltv) {
        if (undefined == upltv.upltvbridge || upltv.upltvbridge == null) {
            upltv.upltvbridge = upltva;
        }
    }
};

var bridgeInterface = {
    initSdkSuccessed: false,
    initVokeCall: null,

    gdprcallbak: null,

    // 加载异步回调
    initSdkCallback: function initSdkCallback(msg1) {

        if (msg1 == "true" || msg1 == true) {
            this.initSdkSuccessed = true;
        }

        cc.log("===> js initSdkCallback..., %s", msg1);
        if (undefined != this.initVokeCall && this.initVokeCall != null && typeof this.initVokeCall == "function") {
            this.initVokeCall(this.initSdkSuccessed);
        }

        if (undefined != this.initVokeCall) {
            this.initVokeCall = null;
        }
    },

    // 回调代理
    vokeMethod: function vokeMethod(params) {
        functionNames.handleVokeParams(params);
    },

    // 插屏ready异步回调代理
    vokeILReadyMethod: function vokeILReadyMethod(cpPlaceId, r) {
        this.handleILReadyMethod(cpPlaceId, r);
    },

    handleILReadyMethod: function handleILReadyMethod(cpPlaceId, r) {
        //cc.log("===> js handleILReadyMethod cpPlaceId: %s, r: %s, type r: %s", cpPlaceId, r, typeof r);
        var key = "ILReady_" + cpPlaceId;
        var call = ltvMap.get(key);
        if (call != null) {
            ltvMap.remove(key);
            if (typeof call == "function") {
                var rr = false;
                if (r == "true" || r == true) {
                    rr = true;
                }
                call(rr);
            }
        }
    }
};

// upltv 外部调用对象，提供js api，实现游戏js与adsdk之间的互通

var upltv = upltv || {

    upltvbridge: null,

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK初始化接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    /*
     初始化广告sdk
     请务必优先完成sdk初始化后，才能正常使用SDK的其它API接口
     参数zone：产品发行的区域，0:海外，1:中国大陆，2:自动根据ip定位
     可选参数callback：SDK初始化完成后的回调接口, 回调接口包含一个布尔参数 callback(boolean)，true表示成功，否则失败
    */
    intSdk: function intSdk(zone, callback) {

        if (cc.bridgeInterface.initSdkSuccessed == true) {
            printLog("===> js intSdk don't called again with zone:" + zone);
            return;
        }
        printLog("===> js intSdk call with zone: " + zone);
        if (callback != undefined && callback != null && typeof callback == "function") {
            printLog("===> js set initVokeCall...");
            cc.bridgeInterface.initVokeCall = callback;
        }

        var vokecall = "cc.bridgeInterface.vokeMethod";
        var callname = "cc.bridgeInterface.initSdkCallback";

        loadJsBridgeObject();

        if (cc.sys.os === cc.sys.OS_IOS) {
            // this.upltvbridge = upltvoc;
            if (undefined != this.upltvbridge && this.upltvbridge != null) {
                this.upltvbridge.setShowLog(isShowLog);
                this.upltvbridge.initIosSDK(zone, vokecall, callname);
            }
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            // this.upltvbridge = upltva;
            if (undefined != this.upltvbridge && this.upltvbridge != null) {
                this.upltvbridge.setShowLog(isShowLog);
                this.upltvbridge.initAndroidSDK(zone, vokecall, callname);
            }
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK A/B广告测试相关接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    /*
     进行A/B测试时，先初始化广告配置
     参数 gameAccountId ：        string类型， 用户在游戏中的帐号id（必填）
     参数 isCompleteTask  ：      boolean类型，是否完成了游戏中的新手任务
     参数 isPaid ：               number类型，是否付费用户，0则未付费
     参数 promotionChannelName ： string类型，推广渠道，没有可以传 ""
     参数 gender ：               string类型，"M", "F"，未知可以传""
     参数 age ：                  number类型，未知可以传-1
     参数 tags ：                 Array类型（string数组），标签，没有可以传 null
    */
    initAbtConfigJson: function initAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tags) {
        var tagstring = null;
        if (undefined != tags && null != tags && tags instanceof Array) {
            var count = tags.length;
            //printLog("===> js initAbtConfigJson tags size: " + count);
            tagstring = "{\"array\":[";
            for (var i = 0; i < count; i++) {
                tagstring += "\"" + tags[i];
                if (i < count - 1) tagstring += "\",";else tagstring += "\"]}";
            }
            //printLog("===> js initAbtConfigJson tags string: "+ tagstring);
        }
        if (undefined == isCompleteTask) {
            isCompleteTask = false;
        }

        if (undefined == isPaid) {
            isPaid = 0;
        }
        //printLog("===> js initAbtConfigJson isPaid: " + isPaid);
        if (undefined == promotionChannelName) {
            promotionChannelName = "";
        }

        if (undefined == gender) {
            gender = "";
        }

        if (undefined == age) {
            age = -1;
        }

        if (cc.sys.os === cc.sys.OS_IOS) {
            if (undefined != this.upltvbridge && this.upltvbridge != null) {
                this.upltvbridge.initIosAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring);
            }
        } else if (cc.sys.os === cc.sys.OS_ANDROID) {
            if (undefined != this.upltvbridge && this.upltvbridge != null) {
                this.upltvbridge.initAndroidAbtConfigJson(gameAccountId, isCompleteTask, isPaid, promotionChannelName, gender, age, tagstring);
            }
        }
    },

    /**
     完成A/B Testing初始化后，通过此方法获取结果
     为了保证正确获取结果，调用时间建议延后initAbtConfigJson() 2秒以上
     参数 cpPlaceId ：        string类型， 广告位
    */
    getAbtConfig: function getAbtConfig(cpPlaceId) {
        if (undefined != cpPlaceId && null != cpPlaceId && typeof cpPlaceId == "string") {
            if (cc.sys.os === cc.sys.OS_IOS) {
                if (undefined != this.upltvbridge && this.upltvbridge != null) {
                    var r = this.upltvbridge.getIosAbtConfig(cpPlaceId);
                    if (r == "") {
                        return null;
                    } else {
                        return r;
                    }
                }
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                if (undefined != this.upltvbridge && this.upltvbridge != null) {
                    var r = this.upltvbridge.getAndroidAbtConfig(cpPlaceId);
                    if (r == "") {
                        return null;
                    } else {
                        return r;
                    }
                }
            }
        }

        return null;
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK 激励视屏广告相关接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // 打开激励视屏的debug界面
    showRewardDebugUI: function showRewardDebugUI() {
        //upltvbridge:showAndroidRewardDebugUI()
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.showIosRewardDebugUI();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.showAndroidRewardDebugUI();
            }
        }
    },

    // 设置激励视屏加载回调接口
    // 用于监听当前激励视屏的加载结果（成功或失败）
    // 此接口一旦回调，内部会自动释放，再次监听时需要重新设定回调接口
    setRewardVideoLoadCallback: function setRewardVideoLoadCallback(loadsuccess, locadfail) {
        //printLog("===> js call setRewardVideoLoadCallback");
        if (undefined == loadsuccess || null == loadsuccess || typeof loadsuccess != "function") {
            printLog("===> setRewardVideoLoadCallback(), the loadsuccess can't be undefined or null or non-function type.");
            return;
        }
        if (undefined == locadfail || null == locadfail || typeof locadfail != "function") {
            printLog("===> setRewardVideoLoadCallback(), the locadfail can't be undefined or null or non-function type.");
            return;
        }

        ltvMap.rewardLoadFailCall = locadfail == undefined ? null : locadfail;
        ltvMap.rewardLoadSuccessCall = loadsuccess == undefined ? null : loadsuccess;
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.setIosRewardVideoLoadCallback();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.setAndroidRewardVideoLoadCallback();
            }
        }
    },

    // 设置激励视屏展示回调接口，用于监听激励视屏广告的在某次展示时诸如点击，关闭，奖励发放等事件回调
    // 展示接口的引用会被内部保存，不会释放
    // 回调接口功能顺序：展示回调，点击回调，关闭回调，激励发放成功回调，激励发放失败回调
    // 回调接口参数：事件类型，广告位，showCall(type, cpadid)
    setRewardVideoShowCallback: function setRewardVideoShowCallback(showCall) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == showCall || null == showCall || typeof showCall != "function") {
                printLog("===> setRewardVideoShowCallback(), the showCall can't be undefined or null or non-function type.");
                return;
            }

            // if (undefined == didClickCall || null == didClickCall || typeof didClickCall != "function") {
            //     cc.log("===> setRewardVideoShowCallback(), the didClickCall can't be undefined or null or non-function type.");
            //     return;
            // }

            // if (undefined == didCloseCall || null == didCloseCall || typeof didCloseCall != "function") {
            //     cc.log("===> setRewardVideoShowCallback(), the didCloseCall can't be undefined or null or non-function type.");
            //     return;
            // }

            // if (undefined == didGiveCall || null == didGiveCall || typeof didGiveCall != "function") {
            //     cc.log("===> setRewardVideoShowCallback(), the didGiveCall can't be undefined or null or non-function type.");
            //     return;
            // }

            // if (undefined == didAbandonCall || null == didAbandonCall || typeof didAbandonCall != "function") {
            //     cc.log("===> setRewardVideoShowCallback(), the didAbandonCall can't be undefined or null or non-function type.");
            //     return
            // }
            ltvMap.rewardShowCall = showCall;
            //ltvMap.rewardLoadDidOpenCall = didOpenCall == undefined ? null : didOpenCall;
            //ltvMap.rewardLoadDidClickCall = didClickCall == undefined ? null : didClickCall;
            //ltvMap.rewardLoadDidCloseCall = didCloseCall == undefined ? null : didCloseCall;
            //ltvMap.rewardLoadDidGiveCall = didGiveCall == undefined ? null : didGiveCall;
            //ltvMap.rewardLoadDidAbandonCall = didAbandonCall == undefined ? null : didAbandonCall;
        }
    },

    // 判断激励视屏是否准备好
    // 同步返回boolean结果，true 表示广告准备就绪可以展示，false表示广告还在请求中无法展示
    // 通常在showRewardVideo(cpPlaceId)前，调用此方法
    isRewardReady: function isRewardReady() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (cc.sys.os === cc.sys.OS_IOS) {
                return this.upltvbridge.isIosRewardReady();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                return this.upltvbridge.isAndroidRewardReady();
            }
        }
        return false;
    },

    // 展示激励视屏
    // 参数cpPlaceId：激励视屏展示时的广告位，用于业务打点，便于区分收益来源
    showRewardVideo: function showRewardVideo(cpPlaceId) {
        //printLog("===> showIosRewardVideo : " + cpPlaceId);
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (undefined == cpPlaceId) {
                cpPlaceId = null;
            }

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.showIosRewardVideo(cpPlaceId);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                //printLog("===> showAndroidRewardVideo "+ cpPlaceId);
                this.upltvbridge.showAndroidRewardVideo(cpPlaceId);
            }
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK 插屏广告相关接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // 根据广告位，判断某个插屏广告是否准备就绪
    // 异步返回boolean结果，true 表示广告准备就绪可以展示，false表示广告还在请求中无法展示
    // 参数cpPlaceId：广告位
    // 参数callback：回调接口，如callback(true) 或 callback(false)
    isInterstitialReadyAsyn: function isInterstitialReadyAsyn(cpPlaceId, callback) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("Please set the Paramer cpPlaceId's value in function isInterstitialReadyAsyn()");
                return;
            }
            if (callback == cpPlaceId || null == callback) {
                printLog("Please set the Paramer callback's value in function isInterstitialReadyAsyn()");
                return;
            }

            if (typeof callback != "function") {
                printLog("The Paramer 'callback' is  non-function type in function isInterstitialReadyAsyn()");
                return;
            }

            var key = "ILReady_" + cpPlaceId;
            ltvMap.put(key, callback);

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.isIosInterstitialReadyAsyn(cpPlaceId, "cc.bridgeInterface.vokeILReadyMethod");
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.isAndroidInterstitialReadyAsyn(cpPlaceId, "cc.bridgeInterface.vokeILReadyMethod");
            }
        }
    },

    // 根据广告位，判断某个插屏广告是否准备就绪
    // 同步返回boolean结果，true 表示广告准备就绪可以展示，false表示广告还在请求中无法展示
    // 参数cpPlaceId：广告位
    isInterstitialReady: function isInterstitialReady(cpPlaceId) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> isInterstitialReady(), the cpPlaceId can't be undefined or null.");
                return;
            }
            if (cc.sys.os === cc.sys.OS_IOS) {
                return this.upltvbridge.isIosInterstitialReady(cpPlaceId);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                return this.upltvbridge.isAndroidInterstitialReady(cpPlaceId);
            }
        }
        return false;
    },

    // 根据广告位，展示某个插屏广告
    showInterstitialAd: function showInterstitialAd(cpPlaceId) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("Please set the Paramer cpPlaceId's value in function showInterstitialAd()");
                return;
            }
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.showIosInterstitialAd(cpPlaceId);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.showAndroidInterstitialAd(cpPlaceId);
            }
        }
    },

    // 根据广告位，设置某个插屏广告加载回调接口
    // 用于监听插屏广告的加载结果（成功或失败）
    // 此接口一旦回调，内部会自动释放，再次监听时需要重新设定回调接口
    setInterstitialLoadCallback: function setInterstitialLoadCallback(cpPlaceId, loadsuccess, locadfail) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> setIntersitialLoadCall(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (undefined == loadsuccess || null == loadsuccess || typeof loadsuccess != "function") {
                printLog("===> setIntersitialLoadCall(), the loadsuccess can't be undefined or null or null or non-function type.");
                return;
            }

            if (undefined == locadfail || null == locadfail || typeof locadfail != "function") {
                printLog("===> setIntersitialLoadCall(), the locadfail can't be undefined or null or null or non-function type.");
                return;
            }

            var k = cpPlaceId + "_Interstitial";
            var v = ltvMap.get(k) || {};
            v.interstitialLoadSuccessCall = loadsuccess;
            v.interstitialLoadFailCall = locadfail;
            ltvMap.put(k, v);
            printLog("===> setIntersitialLoadCall() ltvMap size: " + ltvMap.size());

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.setIosInterstitialLoadCallback(cpPlaceId);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.setAndroidInterstitialLoadCallback(cpPlaceId);
            }
        }
    },

    // 设置插屏广告展示时的回调接口，用于监听插屏广告的在某次展示时诸如点击，关闭等事件回调
    // 插件展示回调接口的引用会被内部保存，不会释放
    // 回调接口功能顺序：展示回调，点击回调，关闭回调
    // 回调接口参数：事件类型，广告位，showCall(type, cpPlaceId)
    setInterstitialShowCallback: function setInterstitialShowCallback(cpPlaceId, showCall) {

        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> setInterstitialShowCallback(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (undefined == showCall || null == showCall || typeof showCall != "function") {
                printLog("===> setInterstitialShowCallback(), the showCall can't be undefined or null or non-function type.");
                return;
            }

            // if (undefined == didClickCall || null == didClickCall || typeof didClickCall != "function") {
            //     cc.log("===> setInterstitialShowCallback(), the didClickCall can't be undefined or null or non-function type.");
            //     return;
            // }

            // if (undefined == didCloseCall || null == didCloseCall || typeof didCloseCall != "function") {
            //     cc.log("===> setInterstitialShowCallback(), the didCloseCall can't be undefined or null or non-function type.");
            //     return;
            // }

            var k = cpPlaceId;
            var v = ltvMap.get(k) || {};
            v.interstitialShowCall = showCall;
            // v.interstitialDidShowCall = didShowCall;
            // v.interstitialDidClickCall = didClickCall;
            // v.interstitialDidCloseCall = didCloseCall;

            ltvMap.put(k, v);
            //printLog("===> setInterstitialShowCallback() ltvMap size: " + ltvMap.size());
        }
    },

    showInterstitialDebugUI: function showInterstitialDebugUI() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.showIosInterstitialDebugUI();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.showAndroidInterstitialDebugUI();
            }
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK Banner广告相关接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // 移除某个广告位的banner广告
    removeBannerAdAt: function removeBannerAdAt(cpPlaceId) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> removeBannerAdAt(), the cpPlaceId can't be undefined or null.");
                return;
            }
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.removeIosBannerAdAt(cpPlaceId);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.removeAndroidBannerAdAt(cpPlaceId);
            }
        }
    },

    // 将某个广告位的banner广告展示在屏幕顶部
    showBannerAdAtTop: function showBannerAdAtTop(cpPlaceId) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> showBannerAdAtTop(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.showIosBannerAdAtTop(cpPlaceId);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.showAndroidBannerAdAtTop(cpPlaceId);
            }
        }
    },

    // 将某个广告位的banner广告展示在屏幕底部
    showBannerAdAtBottom: function showBannerAdAtBottom(cpPlaceId) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> showBannerAdAtBottom(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.showIosBannerAdAtBottom(cpPlaceId);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.showAndroidBannerAdAtBottom(cpPlaceId);
            }
        }
    },

    // 隐藏当前屏幕的顶部banner广告
    hideBannerAdAtTop: function hideBannerAdAtTop() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.hideIosBannerAdAtTop();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.hideAndroidBannerAdAtTop();
            }
        }
    },

    // 隐藏当前屏幕的底部广告
    hideBannerAdAtBottom: function hideBannerAdAtBottom() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.hideIosBannerAdAtBottom();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.hideAndroidBannerAdAtBottom();
            }
        }
    },

    setTopBannerPadingForIphoneX: function setTopBannerPadingForIphoneX(padding) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.setIosTopBannerPading(padding);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {}
        }
    },

    // 设置某个banner广告位的展示的回调接口，回调接口会被保存只有调用upltv:removeBannerAdAt(cpPlaceId)才会被删除
    // 参数cpPlaceId：banner广告位
    // 参数bannerCall：banner回调接口
    // 回调接口参数：事件类型，广告位，bannerCall(type, cpPlaceId)
    setBannerShowCallback: function setBannerShowCallback(cpPlaceId, bannerCall) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> setBannerShowCallback(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (undefined == bannerCall || null == bannerCall || typeof bannerCall != "function") {
                printLog("===> setBannerShowCallback(), the bannerCall can't be undefined or null or non-function type.");
                return;
            }

            // if (undefined == didClickCall || null == didClickCall || typeof didClickCall != "function") {
            //     printLog("===> setBannerShowCallback(), the didClickCall can't be undefined or null or non-function type.");
            //     return;
            // }

            // if (undefined != didRemoveCall && null != didRemoveCall && typeof didRemoveCall != "function") {
            //     printLog("===> setBannerShowCallback(), the didRemoveCall may be undefined or null, but can't be non-function type.");
            //     return;
            // }

            var v = ltvMap.get(cpPlaceId) || {};
            v.bannerEventCall = bannerCall;
            // v.bannerDidShowCall = didShowCall;
            // v.bannerDidClickCall = didClickCall;
            // if (undefined != didRemoveCall && null != didRemoveCall) {
            //     v.bannerDidRemoveCall = didRemoveCall;
            // }

            ltvMap.put(cpPlaceId, v);

            //printLog("===> setBannerShowCallback() ltvMap size: " + ltvMap.size());
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK Icon广告相关接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // 设置某个icon广告位的展示的回调接口，回调接口会被保存只有调用upltv:removeIconAd(cpPlaceId)才会被删除
    // 参数cpPlaceId：icon广告位
    // 参数bannerCall：icon回调接口
    // 回调接口参数：事件类型，广告位，iconCall(type, cpPlaceId)
    setIconCallback: function setIconCallback(cpPlaceId, iconCall) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> setIconCallback(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (undefined == iconCall || null == iconCall || typeof iconCall != "function") {
                printLog("===> setIconCallback(), the iconCall can't be undefined or null or non-function type.");
                return;
            }

            var v = ltvMap.get(cpPlaceId) || {};
            v.iconEventCall = iconCall;

            ltvMap.put(cpPlaceId, v);
        }
    },

    // 展示icon广告
    showIconAd: function showIconAd(x, y, width, height, rotationAngle, cpPlaceId) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> showIconAd(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.showAndroidIconAdAt(x, y, width, height, rotationAngle, cpPlaceId);
            }

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.showIosIconAdAt(x, y, width, height, rotationAngle, cpPlaceId);
            }
        }
    },

    // 移除icon广告
    removeIconAd: function removeIconAd(cpPlaceId) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (undefined == cpPlaceId || null == cpPlaceId) {
                printLog("===> removeIconAd(), the cpPlaceId can't be undefined or null.");
                return;
            }

            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.removeAndroidIconAdAt(cpPlaceId);
            }

            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.removeIosIconAdAt(cpPlaceId);
            }
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK 手动控制Upltv广告的加载
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // 满足需求：不希望在初始化自动加载广告，且要求根据游戏自主选择合适的时机进行广告加载
    // 设置条件：当sdk默认禁用广告自动加载的功能，且upltv后台云配也关闭此功能时
    // 如果以上条件不成立，即使调用以下方法，SDK也会自动忽略
    loadAdsByManual: function loadAdsByManual() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.loadIosAdsByManual();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.loadAndroidAdsByManual();
            }
        }
    },

    exitApp: function exitApp() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.exitIosApp();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.exitAndroidApp();
            }
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK Android平台 特殊接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // 仅用于android平台
    // 当mainifest的packagename与实际的名字不一致时，需要通过此方法设置当前Manifest中定义的PackageName
    setManifestPackageName: function setManifestPackageName(pkg) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.setAndroidManifestPackageName(pkg);
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {}
        }
    },

    // 仅用于android平台
    // 用于展示upltv在安卓平台的退出广告
    onBackPressed: function onBackPressed() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.onAndroidBackPressed();
            } else if (cc.sys.os === cc.sys.OS_IOS) {}
        }
    },

    // 向统计包的传递CustomerId(仅Android支持，对于非GP的包，可以传androidid)
    // Version 3004(subversion 5) and above support this method
    setCustomerId: function setCustomerId(androidid) {
        loadJsBridgeObject();

        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                if (undefined == androidid || null == androidid) {
                    printLog("===> setCustomerId(), the anroidid can't be null");
                    return;
                }

                this.upltvbridge.setAndroidCustomerId(androidid);
            } else if (cc.sys.os === cc.sys.OS_IOS) {}
        }
    },

    // 设置激退出广告回调接口，用于监听退出广告的在某次展示时如打开，点击，关闭等事件回调
    // 展示接口的引用会被内部保存，不会释放
    // 回调接口功能顺序：广告展示回调，点击回调，退出回调，更多广告回调，取消回调
    // 回调接口参数：事件类型，消息，如backCall(type, message)调用
    setBackPressedCallback: function setBackPressedCallback(backCall) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                ltvMap.backPressedCall = backCall == undefined ? null : backCall;
                // ltvMap.backPressedDidShowCall = didShowCall == undefined ? null : didShowCall;
                // ltvMap.backPressedDidClickCall = didClickCall == undefined ? null : didClickCall;
                // ltvMap.backPressedDidExitCall = didExitCall == undefined ? null : didExitCall;
                // ltvMap.backPressedDidMoreCall = didMoreCall == undefined ? null : didMoreCall;
                // ltvMap.backPressedDidCancelCall = didCancelCall == undefined ? null : didCancelCall;
            } else if (cc.sys.os === cc.sys.OS_IOS) {}
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK GDPR接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // 外部进行GDPR授权时，将用户授权结果同步到UPSDK时，调用此方法
    // 请在初始UPSDK之前调用
    // @param gdprPermissionEnumValue，取upltv.GDPRPermissionEnum定义的值
    // Version 3003 and above support this method
    updateAccessPrivacyInfoStatus: function updateAccessPrivacyInfoStatus(gdprPermissionEnumValue) {

        loadJsBridgeObject();

        if (undefined == gdprPermissionEnumValue || null == gdprPermissionEnumValue) {
            printLog("===> updateAccessPrivacyInfoStatus(), the gdprPermissionEnumValue can't be null");
            return;
        }

        if (gdprPermissionEnumValue != upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown && gdprPermissionEnumValue != upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted && gdprPermissionEnumValue != upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined) {
            printLog("===> updateAccessPrivacyInfoStatus(), the gdprPermissionEnumValue is a wrong type.");
            return;
        }

        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.updateAndroidAccessPrivacyInfoStatus(gdprPermissionEnumValue);
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.updateIosAccessPrivacyInfoStatus(gdprPermissionEnumValue);
            }
        }
    },

    // 获取当前GDPR授权状态，返回GDPRPermissionEnum枚举值
    // 可在初始UPSDK之前调用
    // Version 3003 and above support this method
    getAccessPrivacyInfoStatus: function getAccessPrivacyInfoStatus() {
        loadJsBridgeObject();
        var status = 0;
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                status = this.upltvbridge.getAndroidAccessPrivacyInfoStatus();
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                status = this.upltvbridge.getIosAccessPrivacyInfoStatus();
            }
        }

        if (status == 1) {
            return upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted;
        } else if (status == 2) {
            return upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined;
        } else {
            return upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown;
        }
    },

    // 弹出授权窗口，向用户说明重要数据收集的情况并询问用户是否同意授权
    // 如果用户拒绝授权将放弃相关数据的收集
    // 请在初始化UPSDK之前调用
    // @param callback
    // Version 3003 and above support this method
    notifyAccessPrivacyInfoStatus: function notifyAccessPrivacyInfoStatus(callback) {

        loadJsBridgeObject();

        if (undefined == callback || null == callback) {
            printLog("===> notifyAccessPrivacyInfoStatus(), the callback can't be null.");
            return;
        }

        if (typeof callback != "function") {
            printLog("===> notifyAccessPrivacyInfoStatus(), the callback must be function.");
            return;
        }

        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            bridgeInterface.gdprcallbak.functionId = bridgeInterface.gdprcallbak.functionId + 1;
            var callId = bridgeInterface.gdprcallbak.functionId;
            var key = "" + callId;
            ltvMap.put(key, callback);
            var call = "cc.bridgeInterface.gdprcallbak.javaCall";
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.notifyAndroidAccessPrivacyInfoStatus(call, callId);
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.notifyIosAccessPrivacyInfoStatus(call, key);
            }
        }
    },

    isEuropeanUnionUser: function isEuropeanUnionUser(callback) {

        loadJsBridgeObject();

        if (undefined == callback || null == callback) {
            printLog("===> isEuropeanUnionUser(), the callback can't be null.");
            return;
        }

        if (typeof callback != "function") {
            printLog("===> isEuropeanUnionUser(), the callback must be function.");
            return;
        }

        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            bridgeInterface.gdprcallbak.functionId = bridgeInterface.gdprcallbak.functionId + 1;
            var callId = bridgeInterface.gdprcallbak.functionId;
            var key = "" + callId;
            ltvMap.put(key, callback);
            var call = "cc.bridgeInterface.gdprcallbak.javaCall";
            // var call = "module.exports.upltv.GDPRPermissionEnum.javaCall";
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.isAndroidEuropeanUnionUser(call, callId);
            } else if (cc.sys.os === cc.sys.OS_IOS) {
                this.upltvbridge.isIosEuropeanUnionUser(call, key);
            }
        }
    },

    isOnlineDebugReportEnable: function isOnlineDebugReportEnable() {
        if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) {
            return this.upltvbridge.isOnlineDebugReportEnable();
        } else {
            return false;
        }
    },

    onlineDebugReport: function onlineDebugReport(callname, msg, cpid) {
        if (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) {
            //cc.log("===> js onlineDebugReport function : %s", callname);
            if (functionNames.Function_Receive_Callback == callname) {
                this.upltvbridge.reportIvokePluginMethodReceive(msg);
            } else if (functionNames.Function_Reward_WillOpen == callname) {} else if (functionNames.Function_Reward_DidOpen == callname) {
                this.upltvbridge.reportRDShowDid(msg);
            } else if (functionNames.Function_Reward_DidClick == callname) {
                this.upltvbridge.reportRDRewardClick(msg);
            } else if (functionNames.Function_Reward_DidClose == callname) {
                this.upltvbridge.reportRDRewardClose(msg);
            } else if (functionNames.Function_Reward_DidGivien == callname) {
                this.upltvbridge.reportRDRewardGiven(msg);
            } else if (functionNames.Function_Reward_DidAbandon == callname) {
                this.upltvbridge.reportRDRewardCancel(msg);
            } else if (functionNames.Function_Interstitial_Willshow == callname) {} else if (functionNames.Function_Interstitial_Didshow == callname) {
                this.upltvbridge.reportILShowDid(msg, cpid);
            } else if (functionNames.Function_Interstitial_Didclick == callname) {
                this.upltvbridge.reportILClick(msg, cpid);
            } else if (functionNames.Function_Interstitial_Didclose == callname) {
                this.upltvbridge.reportILClose(msg, cpid);
            }
        }
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK Debug接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // 判断SDK是否开启了Debug log
    // 同步返回boolean结果，true 表示已开启，false表示未开启
    isLogOpened: function isLogOpened() {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {

            if (cc.sys.os === cc.sys.OS_IOS) {
                return this.upltvbridge.isIosLogOpened();
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                return this.upltvbridge.isAndroidLogOpened();
            }
        }
        return false;
    },

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // >>>> JS -- SDK Android平台 特殊接口
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // 仅用于android平台
    // 设置用户是否是小于13岁的儿童
    // Version 3008.1 and above support this method
    setIsChild: function setIsChild(isChild) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.setAndroidIsChild(isChild);
            }
        }
    },

    // 仅用于android平台
    // 设置用户出生年月
    // Version 3008.3 and above support this method
    setBirthday: function setBirthday(year, month) {
        if (undefined != this.upltvbridge && this.upltvbridge != null) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.upltvbridge.setAndroidBirthday(year, month);
            }
        }
    }
};

bridgeInterface.gdprcallbak = {
    functionId: 0,
    javaCall: function javaCall(callId, value) {
        var key = "" + callId;
        var call = ltvMap.get(key);
        if (null != call) {
            if (null != call && typeof call == "function") {
                call(value);
            }
            ltvMap.remove(key);
        }
    }
};
upltv.GDPRPermissionEnum = {};
upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown = 0;
upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted = 1;
upltv.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined = 2;

upltv.AdEventType = {};
// 激励视屏回调事件类型
upltv.AdEventType.VIDEO_EVENT_DID_SHOW = 0;
upltv.AdEventType.VIDEO_EVENT_DID_CLICK = 1;
upltv.AdEventType.VIDEO_EVENT_DID_CLOSE = 2;
upltv.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD = 3;
upltv.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD = 4;

// 插屏回调事件类型
upltv.AdEventType.INTERSTITIAL_EVENT_DID_SHOW = 5;
upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLICK = 6;
upltv.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE = 7;

// Banner广告事件类型
upltv.AdEventType.BANNER_EVENT_DID_SHOW = 8;
upltv.AdEventType.BANNER_EVENT_DID_CLICK = 9;
upltv.AdEventType.BANNER_EVENT_DID_REMOVED = 10;

// exit 广告事件类型
upltv.AdEventType.EXITAD_EVENT_DID_SHOW = 11;
upltv.AdEventType.EXITAD_EVENT_DID_CLICK = 12;
upltv.AdEventType.EXITAD_EVENT_DID_CLICKMORE = 13;
upltv.AdEventType.EXITAD_EVENT_DID_EXIT = 14;
upltv.AdEventType.EXITAD_EVENT_DID_CANCEL = 15;

// icon广告事件类型
upltv.AdEventType.ICON_EVENT_DID_LOAD = 16;
upltv.AdEventType.ICON_EVENT_DID_LOADFAIL = 17;
upltv.AdEventType.ICON_EVENT_DID_SHOW = 18;
upltv.AdEventType.ICON_EVENT_DID_CLICK = 19;

upltv.AdEventType.VIDEO_EVENT_WILL_SHOW = 20;
upltv.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW = 21;

module.exports.upltv = upltv;
module.exports.bridgeInterface = bridgeInterface;

cc._RF.pop();