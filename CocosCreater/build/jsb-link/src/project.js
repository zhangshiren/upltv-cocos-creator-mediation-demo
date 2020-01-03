window.__require = function e(n, i, o) {
function t(s, l) {
if (!i[s]) {
if (!n[s]) {
var d = s.split("/");
d = d[d.length - 1];
if (!n[d]) {
var r = "function" == typeof __require && __require;
if (!l && r) return r(d, !0);
if (c) return c(d, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var a = i[s] = {
exports: {}
};
n[s][0].call(a.exports, function(e) {
return t(n[s][1][e] || e);
}, a, a.exports, e, n, i, o);
}
return i[s].exports;
}
for (var c = "function" == typeof __require && __require, s = 0; s < o.length; s++) t(o[s]);
return t;
}({
HelloWorld: [ function(e, n, i) {
"use strict";
cc._RF.push(n, "d92acejs95ELLuigN2QigjN", "HelloWorld");
var o = e("OpenUpSDK").openup;
cc.bridgeInterface = e("OpenUpSDK").bridgeInterface;
cc.Class({
extends: cc.Component,
properties: {
initSdk: cc.Button,
oneKeyInspect: cc.Button,
initGDPR: cc.Button,
initABTest: cc.Button,
getABConfig: cc.Button,
rdLoadCall: cc.Button,
rdShowCall: cc.Button,
rdIsReady: cc.Button,
rdShow: cc.Button,
rewardPlaceId: "rewardID",
androidAppKey: "3db370851fa6",
iosAppKey: "888889",
ILLoadCall: cc.Button,
ILShowCall: cc.Button,
ILIsReady: cc.Button,
ILShow: cc.Button,
ilPlaceId: "sample_inter",
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
onLoad: function() {
this.initSDKFunc();
this.abTestFunc();
this.rewardViedoFunc();
this.ilViewFunc();
this.bannerViewFunc();
},
initSDKFunc: function() {
var e = this;
this.initSdk.node.on("click", function(n) {
cc.log("===> js intSdk result");
o.initSdk(e.androidAppKey, e.iosAppKey, 0, function(n) {
e.label.string = "js intSdk result:" + n;
cc.log("===> js intSdk result:, %s", n);
});
});
this.oneKeyInspect.node.on("click", function(n) {
e.label.string = "autoOneKeyInspect clicked";
o.autoOneKeyInspect();
});
this.IsLogOpened.node.on("click", function(n) {
var i = o.isLogOpened();
cc.log("===> js IsLogOpened result:, %s", i);
e.label.string = "js IsLogOpened result:" + i;
});
this.initGDPR.node.on("click", function(n) {
cc.log("===> js GDPR start");
var i = o.getAccessPrivacyInfoStatus();
cc.log("=====> js getAccessPrivacyInfoStatus status: %d ", i);
i == o.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown ? o.isEuropeanUnionUser(function(n) {
n ? o.notifyAccessPrivacyInfoStatus(function(n) {
cc.log("=====> js notifyAccessPrivacyInfoStatusCallBack callback: %d ", n);
o.initSdk(e.androidAppKey, e.iosAppKey, 0, function(n) {
cc.log("===> js intSdk result:, %s", n);
e.label.string = "js intSdk result:" + n;
});
}) : o.initSdk(e.androidAppKey, e.iosAppKey, 0, function(n) {
cc.log("===> js intSdk result:, %s", n);
e.label.string = "js intSdk result:" + n;
});
}) : o.initSdk(e.androidAppKey, e.iosAppKey, 0, function(n) {
cc.log("===> js intSdk result:, %s", n);
e.label.string = "js intSdk result:" + n;
});
});
},
abTestFunc: function() {
var e = this;
this.initABTest.node.on("click", function(n) {
o.initAbtConfigJson("u89731", !0, 0, "Facebook", "M", -1, [ "This is the first element.", "The second one.", "The last one." ]);
e.label.string = "ABTest初始化成功";
});
this.getABConfig.node.on("click", function(n) {
var i = o.getAbtConfig("pass");
cc.log("===> js getAbtConfig rr 3333: %s", i);
e.label.string = "js getAbtConfig ：" + i;
});
},
rewardViedoFunc: function() {
var e = this;
this.rdShowCall.node.on("click", function(n) {
o.setRewardVideoShowCallback(function(n, i) {
var t = "unkown";
n == o.AdEventType.VIDEO_EVENT_WILL_SHOW ? t = "Will_Show" : n == o.AdEventType.VIDEO_EVENT_DID_SHOW ? t = "Did_Show" : n == o.AdEventType.VIDEO_EVENT_DID_CLICK ? t = "Did_Click" : n == o.AdEventType.VIDEO_EVENT_DID_CLOSE ? t = "Did_Close" : n == o.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD ? t = "Did_Given_Reward" : n == o.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD && (t = "Did_Abandon_Reward");
cc.log("===> js RewardVideo Show Callback, event: %s, at: %s", t, i);
e.label.string = "js RewardVideo Show Callback: " + t;
});
});
this.rdLoadCall.node.on("click", function(n) {
o.setRewardVideoLoadCallback(function(n, i) {
cc.log("===> js RewardVideo LoadCallback Success at: %s", n);
e.label.string = "js RewardVideo LoadCallback Success at:" + n;
}, function(n, i) {
cc.log("===> js RewardVideo LoadCallback Fail at: %s", n);
e.label.string = "js RewardVideo LoadCallback Fail at:" + n;
});
});
this.rdIsReady.node.on("click", function(n) {
var i = o.isRewardReady();
cc.log("===> js isRewardReady r: %s", i.toString());
e.label.string = "js isRewardReady: " + i.toString();
});
this.rdShow.node.on("click", function(n) {
var i = o.isRewardReady();
cc.log("===> js isRewardReady r: %s", i);
e.label.sting = "js isRewardReady r:" + i;
if (1 == i) {
cc.log("===> js showRewardVideo call");
e.label.string = "js showRewardVideo 成功";
o.showRewardVideo(e.rewardPlaceId);
}
});
},
ilViewFunc: function() {
var e = this;
this.ILShowCall.node.on("click", function(n) {
o.setInterstitialShowCallback(e.ilPlaceId, function(n, i) {
var t = "unkown";
n == o.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW ? t = "Will_Show" : n == o.AdEventType.INTERSTITIAL_EVENT_DID_SHOW ? t = "Did_Show" : n == o.AdEventType.INTERSTITIAL_EVENT_DID_CLICK ? t = "Did_Click" : n == o.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE && (t = "Did_Close");
cc.log("===> js il ad event: %s, at placementid: %s", t, i);
e.label.string = "gagah gjahga aghajfgha gjahfgjha jkgahg agjkahga js il ad event: " + t;
});
});
this.ILLoadCall.node.on("click", function(n) {
o.setInterstitialLoadCallback(e.ilPlaceId, function(n, i) {
cc.log("===> js il load callback success: %s at placementid:%s", i, n);
e.label.string = "js il load callback success: " + n;
}, function(n, i) {
cc.log("===> js il load callback fail: %s at placementid:%s", i, n);
e.label.string = "js il load callback fail: " + n;
});
});
this.ILIsReady.node.on("click", function(n) {
o.isInterstitialReadyAsyn(e.ilPlaceId, function(n) {
cc.log("===> js il ad isreadyasyn: %s at placementid:%s", n, e.ilPlaceId);
e.label.string = "js il ad isreadyasyn: " + e.ilPlaceId;
});
});
this.ILShow.node.on("click", function(n) {
var i = o.isInterstitialReady(e.ilPlaceId);
cc.log("===> js il ad isready: %s at placementid:%s", i, e.ilPlaceId);
e.label.string = "js il ad isready: " + e.ilPlaceId;
if (1 == i) {
o.showInterstitialAd(e.ilPlaceId);
e.label.string = "插屏展示成功";
}
});
},
bannerViewFunc: function() {
var e = this;
this.bannerCall.node.on("click", function(n) {
o.setBannerShowCallback(e.bannerPlaceId, function(n, i) {
var t = "unkown";
n == o.AdEventType.BANNER_EVENT_DID_SHOW ? t = "Did_Show" : n == o.AdEventType.BANNER_EVENT_DID_CLICK ? t = "Did_Click" : n == o.AdEventType.BANNER_EVENT_DID_REMOVED && (t = "Did_Removed");
cc.log("=====> banner event: %s, at : %s", t, i);
e.label.string = "banner event: " + i;
});
});
this.showTopBanner.node.on("click", function(n) {
o.showBannerAdAtTop(e.bannerPlaceId);
e.label.string = "顶部Banner展示";
});
this.showBottomBanner.node.on("click", function(n) {
o.showBannerAdAtBottom(e.bannerPlaceId);
e.label.string = "底部Banner展示";
});
this.hideAllBanner.node.on("click", function(n) {
o.hideBannerAdAtTop();
o.hideBannerAdAtBottom();
e.label.string = "隐藏展示";
});
this.removeAllBanner.node.on("click", function(n) {
o.removeBannerAdAt(e.bannerPlaceId);
e.label.string = "移除展示";
});
},
update: function(e) {}
});
cc._RF.pop();
}, {
OpenUpSDK: "OpenUpSDK"
} ],
OpenUpAndroid: [ function(e, n, i) {
"use strict";
cc._RF.push(n, "6f7a4ly8GtN2Jz9mOSCTSrA", "OpenUpAndroid");
var o = "com/openup/sdk/cocosjs/JsProxy", t = !1, c = c || {
setShowLog: function(e) {
void 0 != e && null != e && (t = e);
},
printJsLog: function(e) {
t && void 0 != e && null != e && jsb.reflection.callStaticMethod("android/util/Log", "i", "(Ljava/lang/String;Ljava/lang/String;)I", "cocos2dx-js", e);
},
initAndroidSDK: function(e, n, i) {
jsb.reflection.callStaticMethod(o, "initSDK", "(Ljava/lang/String;Ljava/lang/String;)V", e, i);
jsb.reflection.callStaticMethod(o, "setInvokeDelegate", "(Ljava/lang/String;)V", n);
},
initAndroidAbtConfigJson: function(e, n, i, t, c, s, l) {
jsb.reflection.callStaticMethod(o, "initAbtConfigJsonForJs", "(Ljava/lang/String;ZILjava/lang/String;Ljava/lang/String;ILjava/lang/String;)V", e, n, i, t, c, s, l);
},
getAndroidAbtConfig: function(e) {
return jsb.reflection.callStaticMethod(o, "getAbtConfig", "(Ljava/lang/String;)Ljava/lang/String;", e);
},
showAndroidRewardDebugUI: function() {
jsb.reflection.callStaticMethod(o, "showRewardDebugActivity", "()V");
},
setAndroidRewardVideoLoadCallback: function() {
jsb.reflection.callStaticMethod(o, "setRewardVideoLoadCallback", "()V");
},
isAndroidRewardReady: function() {
return jsb.reflection.callStaticMethod(o, "isRewardReady", "()Z");
},
showAndroidRewardVideo: function(e) {
null == e && (e = "reward_video");
jsb.reflection.callStaticMethod(o, "showRewardVideo", "(Ljava/lang/String;)V", e);
},
setAndroidInterstitialLoadCallback: function(e) {
jsb.reflection.callStaticMethod(o, "setInterstitialCallbackAt", "(Ljava/lang/String;)V", e);
},
isAndroidInterstitialReadyAsyn: function(e, n) {
jsb.reflection.callStaticMethod(o, "isInterstitialReadyForJs", "(Ljava/lang/String;Ljava/lang/String;)V", e, n);
},
isAndroidInterstitialReady: function(e) {
return jsb.reflection.callStaticMethod(o, "isInterstitialReady", "(Ljava/lang/String;)Z", e);
},
showAndroidInterstitialAd: function(e) {
jsb.reflection.callStaticMethod(o, "showInterstitialForJs", "(Ljava/lang/String;)V", e);
},
showAndroidInterstitialDebugUI: function() {
jsb.reflection.callStaticMethod(o, "showInterstitialDebugActivityForJs", "()V");
},
removeAndroidBannerAdAt: function(e) {
jsb.reflection.callStaticMethod(o, "removeBanner", "(Ljava/lang/String;)V", e);
},
showAndroidBannerAdAtTop: function(e) {
jsb.reflection.callStaticMethod(o, "showTopBanner", "(Ljava/lang/String;)V", e);
},
showAndroidBannerAdAtBottom: function(e) {
jsb.reflection.callStaticMethod(o, "showBottomBanner", "(Ljava/lang/String;)V", e);
},
hideAndroidBannerAdAtTop: function() {
jsb.reflection.callStaticMethod(o, "hideTopBanner", "()V");
},
hideAndroidBannerAdAtBottom: function() {
jsb.reflection.callStaticMethod(o, "hideBottomBanner", "()V");
},
showAndroidIconAdAt: function(e, n, i, t, c, s) {
jsb.reflection.callStaticMethod(o, "showIconAd", "(IIIIILjava/lang/String;)V", e, n, i, t, c, s);
},
removeAndroidIconAdAt: function(e) {
jsb.reflection.callStaticMethod(o, "removeIconAd", "(Ljava/lang/String;)V", e);
},
loadAndroidAdsByManual: function() {
jsb.reflection.callStaticMethod(o, "loadAnroidAdsByManual", "()V");
},
exitAndroidApp: function() {
jsb.reflection.callStaticMethod(o, "exitAndroidApp", "()V");
},
setAndroidManifestPackageName: function(e) {
jsb.reflection.callStaticMethod(o, "setManifestPackageName", "(Ljava/lang/String;)V", e);
},
onAndroidBackPressed: function() {
jsb.reflection.callStaticMethod(o, "onBackPressed", "()V");
},
setAndroidCustomerId: function(e) {
jsb.reflection.callStaticMethod(o, "setCustomerIdForJs", "(Ljava/lang/String;)V", e);
},
updateAndroidAccessPrivacyInfoStatus: function(e) {
jsb.reflection.callStaticMethod(o, "updateAccessPrivacyInfoStatus", "(I)V", e);
},
getAndroidAccessPrivacyInfoStatus: function() {
return jsb.reflection.callStaticMethod(o, "getAccessPrivacyInfoStatus", "()I");
},
notifyAndroidAccessPrivacyInfoStatus: function(e, n) {
jsb.reflection.callStaticMethod(o, "notifyAccessPrivacyInfoStatus", "(Ljava/lang/String;I)V", e, n);
},
isAndroidEuropeanUnionUser: function(e, n) {
jsb.reflection.callStaticMethod(o, "isEuropeanUnionUser", "(Ljava/lang/String;I)V", e, n);
},
reportIvokePluginMethodReceive: function(e) {
jsb.reflection.callStaticMethod(o, "reportIvokePluginMethodReceive", "(Ljava/lang/String;)V", e);
},
reportRDRewardClose: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardClose", "(Ljava/lang/String;)V", e);
},
reportRDRewardClick: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardClick", "(Ljava/lang/String;)V", e);
},
reportRDRewardGiven: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardGiven", "(Ljava/lang/String;)V", e);
},
reportRDShowDid: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDShowDid", "(Ljava/lang/String;)V", e);
},
reportRDRewardCancel: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardCancel", "(Ljava/lang/String;)V", e);
},
reportILClose: function(e, n) {
jsb.reflection.callStaticMethod(o, "reportILClose", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == n ? "" : n, e);
},
reportILClick: function(e, n) {
jsb.reflection.callStaticMethod(o, "reportILClick", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == n ? "" : n, e);
},
reportILShowDid: function(e, n) {
jsb.reflection.callStaticMethod(o, "reportILShowDid", "(Ljava/lang/String;Ljava/lang/String;)V", void 0 == n ? "" : n, e);
},
isOnlineDebugReportEnable: function() {
return jsb.reflection.callStaticMethod(o, "isReportOnlineEnable", "()Z");
},
isAndroidLogOpened: function() {
return jsb.reflection.callStaticMethod(o, "isLogOpened", "()Z");
},
setAndroidIsChild: function(e) {
jsb.reflection.callStaticMethod(o, "setIsChild", "(Z)V", e);
},
setAndroidBirthday: function(e, n) {
jsb.reflection.callStaticMethod(o, "setBirthday", "(II)V", e, n);
},
autoOneKeyInspectByAndroid: function() {
jsb.reflection.callStaticMethod(o, "autoOneKeyInspect", "()V");
},
tellToDoctorByAndroid: function(e, n, i) {
jsb.reflection.callStaticMethod(o, "tellToDoctor", "(Ljava/lang/String;Ljava/lang/String;Ljava/lang/String;)V", e, n, i);
},
setAppsFlyerUIDByAndroid: function(e) {
jsb.reflection.callStaticMethod(o, "setAppsflyerUID", "(Ljava/lang/String;)V", e);
},
setAdjustIdByAndroid: function(e) {
jsb.reflection.callStaticMethod(o, "setAdjustID", "(Ljava/lang/String;)V", e);
}
};
n.exports = c;
cc._RF.pop();
}, {} ],
OpenUpIos: [ function(e, n, i) {
"use strict";
cc._RF.push(n, "c4619jIgY1PupGVIi+6C1j5", "OpenUpIos");
var o = "OpenUpBrigeCreatorJs", t = !1, c = c || {
setShowLog: function(e) {
void 0 != e && null != e && (t = e);
},
printJsLog: function(e) {
t && void 0 != e && null != e && jsb.reflection.callStaticMethod(o, "printJsLog:", e);
},
initIosSDK: function(e, n, i, t) {
void 0 != t && null != t ? jsb.reflection.callStaticMethod(o, "initSdkByJsWithAppKey:zone:withCallback:", e, n, t) : jsb.reflection.callStaticMethod(o, "initSdkByJsWithAppKey:zone:", e, n);
jsb.reflection.callStaticMethod(o, "setVokeMethod:", i);
},
initIosAbtConfigJson: function(e, n, i, t, c, s, l) {
jsb.reflection.callStaticMethod(o, "initAbtConfigJsonByJs:complete:paid:channel:gender:age:tags:", e, n, i, t, c, s, l);
},
getIosAbtConfig: function(e) {
return jsb.reflection.callStaticMethod(o, "getIosAbtConfigByJs:", e);
},
showIosRewardDebugUI: function() {
jsb.reflection.callStaticMethod(o, "showRewardDebugActivityByJs");
},
setIosRewardVideoLoadCallback: function() {
jsb.reflection.callStaticMethod(o, "setRewardVideoLoadCallbackByJs");
},
isIosRewardReady: function() {
return jsb.reflection.callStaticMethod(o, "isIosRewardReadyByJs");
},
showIosRewardVideo: function(e) {
jsb.reflection.callStaticMethod(o, "showIosRewardVideoByJs:", e);
},
isIosInterstitialReadyAsyn: function(e, n) {
jsb.reflection.callStaticMethod(o, "isInterstitialReadyAsynByJs:callback:", e, n);
},
isIosInterstitialReady: function(e) {
return jsb.reflection.callStaticMethod(o, "isInterstitialReadyByJs:", e);
},
showIosInterstitialAd: function(e) {
jsb.reflection.callStaticMethod(o, "showInterstitialByJs:", e);
},
setIosInterstitialLoadCallback: function(e) {
jsb.reflection.callStaticMethod(o, "setInterstitialCallbackByJs:", e);
},
showIosInterstitialDebugUI: function() {
jsb.reflection.callStaticMethod(o, "showInterstitialDebugActivityByJs");
},
removeIosBannerAdAt: function(e) {
jsb.reflection.callStaticMethod(o, "removeBannerByJs:", e);
},
showIosBannerAdAtTop: function(e) {
jsb.reflection.callStaticMethod(o, "showTopBannerByJs:", e);
},
showIosBannerAdAtBottom: function(e) {
jsb.reflection.callStaticMethod(o, "showBottomBannerByJs:", e);
},
hideIosBannerAdAtTop: function() {
jsb.reflection.callStaticMethod(o, "hideTopBannerByJs");
},
hideIosBannerAdAtBottom: function() {
jsb.reflection.callStaticMethod(o, "hideBottomBannerByJs");
},
setIosTopBannerPading: function(e) {
var n = "0";
"number" == typeof e ? n = String(e) : "string" == typeof e && (n = e);
jsb.reflection.callStaticMethod(o, "setTopBannerPadingForIphonexByJs:", n);
},
showIosIconAdAt: function(e, n, i, t, c, s) {
jsb.reflection.callStaticMethod(o, "showIconX:y:width:height:rotationAngle:placementId:", e, n, i, t, c, s);
},
removeIosIconAdAt: function(e) {
jsb.reflection.callStaticMethod(o, "removeIcon:", e);
},
loadIosAdsByManual: function() {
jsb.reflection.callStaticMethod(o, "loadIosAdsByManualByJs");
},
exitIosApp: function() {
jsb.reflection.callStaticMethod(o, "exitIosAppByJs");
},
updateIosAccessPrivacyInfoStatus: function(e) {
jsb.reflection.callStaticMethod(o, "updateAccessPrivacyInfoStatusByJs:", e);
},
getIosAccessPrivacyInfoStatus: function() {
return jsb.reflection.callStaticMethod(o, "getAccessPrivacyInfoStatusByJs");
},
notifyIosAccessPrivacyInfoStatus: function(e, n) {
jsb.reflection.callStaticMethod(o, "notifyAccessPrivacyInfoStatusByJs:callId:", e, n);
},
isIosEuropeanUnionUser: function(e, n) {
jsb.reflection.callStaticMethod(o, "isEuropeanUnionUserByJs:callId:", e, n);
},
reportIvokePluginMethodReceive: function(e) {
jsb.reflection.callStaticMethod(o, "reportIvokePluginMethodReceiveByJs:", e);
},
reportRDRewardClose: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardCloseByJs:", e);
},
reportRDRewardClick: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardClickByJs:", e);
},
reportRDRewardGiven: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardGivenByJs:", e);
},
reportRDShowDid: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDShowDidByJs:", e);
},
reportRDRewardCancel: function(e) {
jsb.reflection.callStaticMethod(o, "reportRDRewardCancelByJs:", e);
},
reportILClose: function(e, n) {
jsb.reflection.callStaticMethod(o, "reportILCloseByJs:msg:", void 0 == n ? "" : n, e);
},
reportILClick: function(e, n) {
jsb.reflection.callStaticMethod(o, "reportILClickByJs:msg:", void 0 == n ? "" : n, e);
},
reportILShowDid: function(e, n) {
jsb.reflection.callStaticMethod(o, "reportILShowDidByJs:msg:", void 0 == n ? "" : n, e);
},
isOnlineDebugReportEnable: function() {
return jsb.reflection.callStaticMethod(o, "isReportOnlineEnableByJs");
},
isIosLogOpened: function() {
return jsb.reflection.callStaticMethod(o, "isIosLogOpenedByJs");
},
autoOneKeyInspectByIos: function() {
jsb.reflection.callStaticMethod(o, "autoOneKeyInspectByJs");
},
tellToDoctorByIos: function(e, n, i) {
jsb.reflection.callStaticMethod(o, "tellToDoctorByJs:adid:msg:", e, n, i);
},
setAppsFlyerUIDByIos: function(e) {
jsb.reflection.callStaticMethod(o, "setAppsFlyerUIDByJs:", e);
},
setAdjustIdByIos: function(e) {
jsb.reflection.callStaticMethod(o, "setAdjustIdByJs:", e);
}
};
n.exports = c;
cc._RF.pop();
}, {} ],
OpenUpSDK: [ function(e, n, i) {
"use strict";
cc._RF.push(n, "d322a2LzaBEsqczvEafiic9", "OpenUpSDK");
var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = e("OpenUpIos"), c = e("OpenUpAndroid"), s = !1, l = function(e) {
0;
}, d = function(e, n, i) {
void 0 != f && (void 0 != i ? f.onlineDebugReport(e, n, i) : f.onlineDebugReport(e, n));
}, r = function(e, n, i) {
void 0 != f && void 0 != f.openupbridge && null != f.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? f.openupbridge.tellToDoctorByAndroid(e, n, i) : cc.sys.os === cc.sys.OS_IOS && f.openupbridge.tellToDoctorByIos(e, null == n ? "" : n, null == i ? "" : i));
}, a = {
handleVokeParams: function(e) {
if (void 0 != e && null != e && "string" == typeof e) {
var n = e.indexOf(":"), i = null;
if (!(n <= 0)) {
var o = (i = e.substr(n + 1)).indexOf(","), t = i.substring(0, o), c = null, _ = null;
if ((n = (i = i.substr(o + 1)).indexOf(":")) > 0 && (o = (i = i.substr(n + 1)).indexOf(",")) > 0) {
c = i.substring(0, o);
null != (i = i.substr(o + 1)) && (n = i.indexOf(":")) > 0 && (_ = i.substr(n + 1));
}
0;
var p = void 0 != f && f.isOnlineDebugReportEnable();
p && d(a.Function_Receive_Callback, "CocosJs Receive message, callname:" + t + ", cpadid:" + c);
if (a.Action_Doctor_ON_DUTY == t) p && (s = !0); else if (a.Action_Doctor_OFF_DUTY == t) p && (s = !1); else if (a.Function_Doctor_IL_Load_Request == t) p && 1 == s && f.setInterstitialLoadCallback(a.Function_Doctor_IL_Show_AdId, function(e, n) {
r(a.Action_Doctor_Ad_IL_LoadOk_Reply, a.Function_Doctor_IL_Show_AdId, "cocoscreator js il load ok");
}, function(e, n) {
r(a.Action_Doctor_Ad_IL_LoadFail_Reply, a.Function_Doctor_IL_Show_AdId, n);
}); else if (a.Function_Doctor_RD_Load_Request == t) p && 1 == s && f.setRewardVideoLoadCallback(function(e, n) {
r(a.Action_Doctor_Ad_RD_LoadOk_Reply, a.Function_Doctor_RD_Show_AdId, "cocoscreator js rd load ok");
}, function(e, n) {
r(a.Action_Doctor_Ad_RD_LoadFail_Reply, a.Function_Doctor_RD_Show_AdId, n);
}); else if (a.Function_Doctor_RD_Show_Request == t) f.showRewardVideo(a.Function_Doctor_RD_Show_AdId); else if (a.Function_Doctor_IL_Show_Request == t) f.showInterstitialAd(a.Function_Doctor_IL_Show_AdId); else if (a.Function_Reward_DidLoadFail == t) if (null != u.rewardLoadFailCall && "function" == typeof u.rewardLoadFailCall) {
var I = u.rewardLoadFailCall;
u.resetRewardLoadCallback();
I(c, _);
} else l(); else if (a.Function_Reward_DidLoadSuccess == t) if (null != u.rewardLoadSuccessCall && "function" == typeof u.rewardLoadSuccessCall) {
u.rewardLoadSuccessCall(c, _);
u.resetRewardLoadCallback();
} else l(); else if (a.Function_Reward_WillOpen == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on video willopen event.");
r(a.Action_Doctor_Ad_RD_WillShow_Reply, a.Function_Doctor_RD_Show_AdId, "tell the rd willshow event to doctor.");
return;
}
if (null != (y = u.rewardShowCall) && "function" == typeof y) {
y(f.AdEventType.VIDEO_EVENT_WILL_SHOW, c);
p && d(t, "CocosJs did run callback on video willopen event.");
} else p && d(t, "CocosJs not run callback on video willopen event.");
} else if (a.Function_Reward_DidOpen == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on video shown event.");
r(a.Action_Doctor_Ad_RD_DidShow_Reply, a.Function_Doctor_RD_Show_AdId, "tell the rd didopen event to doctor.");
return;
}
if (null != (y = u.rewardShowCall) && "function" == typeof y) {
y(f.AdEventType.VIDEO_EVENT_DID_SHOW, c);
p && d(t, "CocosJs did run callback on video shown event.");
} else p && d(t, "CocosJs not run callback on video shown event.");
} else if (a.Function_Reward_DidClick == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on video clicked event.");
r(a.Action_Doctor_Ad_RD_DidClick_Reply, a.Function_Doctor_RD_Show_AdId, "tell the rd didclick event to doctor.");
return;
}
if (null != (y = u.rewardShowCall) && "function" == typeof y) {
y(f.AdEventType.VIDEO_EVENT_DID_CLICK, c);
p && d(t, "CocosJs did run callback on video clicked event.");
} else p && d(t, "CocosJs not run callback on video clicked event.");
} else if (a.Function_Reward_DidClose == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on video closed event.");
r(a.Action_Doctor_Ad_RD_DidClose_Reply, a.Function_Doctor_RD_Show_AdId, "tell the rd didclose event to doctor.");
return;
}
if (null != (y = u.rewardShowCall) && "function" == typeof y) {
y(f.AdEventType.VIDEO_EVENT_DID_CLOSE, c);
p && d(t, "CocosJs did run callback on video closed event.");
} else p && d(t, "CocosJs not run callback on video closed event.");
} else if (a.Function_Reward_DidGivien == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on video reward given event.");
r(a.Action_Doctor_Ad_RD_Given_Reply, a.Function_Doctor_RD_Show_AdId, "tell the rd givenreward event to doctor.");
return;
}
if (null != (y = u.rewardShowCall) && "function" == typeof y) {
y(f.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD, c);
p && d(t, "CocosJs did run callback on video reward given event.");
} else p && d(t, "CocosJs not run callback on video reward given event.");
} else if (a.Function_Reward_DidAbandon == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on video reward cancel event.");
r(a.Action_Doctor_Ad_RD_Cancel_Reply, a.Function_Doctor_RD_Show_AdId, "tell the noreward event to doctor.");
return;
}
if (null != (y = u.rewardShowCall) && "function" == typeof y) {
y(f.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD, c);
p && d(t, "CocosJs did run callback on video reward cancel event.");
} else p && d(t, "CocosJs not run callback on video reward cancel event.");
} else if (a.Function_Interstitial_DidLoadFail == t) {
var h = c + "_Interstitial";
if (null != (g = u.get(h))) {
var y = g.interstitialLoadFailCall;
u.remove(h);
null != y && "function" == typeof y && y(c, _);
l();
}
} else if (a.Function_Interstitial_DidLoadSuccess == t) {
h = c + "_Interstitial";
if (null != (g = u.get(h))) {
null != (y = g.interstitialLoadSuccessCall) && "function" == typeof y ? y(c, _) : l();
u.remove(h);
} else l();
} else if (a.Function_Interstitial_Willshow == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on il ad willshown event.", a.Function_Doctor_IL_Show_AdId);
r(a.Action_Doctor_Ad_IL_WillShow_Reply, a.Function_Doctor_IL_Show_AdId, "tell the il willshow event to doctor.");
return;
}
var A = !1;
if (null != (g = u.get(c))) {
if (null != (y = g.interstitialShowCall) && "function" == typeof y) {
y(f.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW, c);
if (p) {
A = !0;
d(t, "CocosJs did run callback on il ad willshown event at " + c, c);
}
}
}
p && 0 == A && d(t, "CocosJs not run callback on il ad willshown event at " + c, c);
} else if (a.Function_Interstitial_Didshow == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on il ad shown event.", a.Function_Doctor_IL_Show_AdId);
r(a.Action_Doctor_Ad_IL_DidShow_Reply, a.Function_Doctor_IL_Show_AdId, "tell the il didshow event to doctor.");
return;
}
A = !1;
if (null != (g = u.get(c))) {
if (null != (y = g.interstitialShowCall) && "function" == typeof y) {
y(f.AdEventType.INTERSTITIAL_EVENT_DID_SHOW, c);
if (p) {
A = !0;
d(t, "CocosJs did run callback on il ad shown event at " + c, c);
}
}
}
p && 0 == A && d(t, "CocosJs not run callback on il ad shown event at " + c, c);
} else if (a.Function_Interstitial_Didclose == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on il ad closed event.", a.Function_Doctor_IL_Show_AdId);
r(a.Action_Doctor_Ad_IL_DidClose_Reply, a.Function_Doctor_IL_Show_AdId, "tell the il didclose event to doctor.");
return;
}
A = !1;
if (null != (g = u.get(c))) {
if (null != (y = g.interstitialShowCall) && "function" == typeof y) {
y(f.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE, c);
if (p) {
A = !0;
d(t, "CocosJs did run callback on il ad closed event at " + c, c);
}
}
}
p && 0 == A && d(t, "CocosJs not run callback on il ad closed event at " + c, c);
} else if (a.Function_Interstitial_Didclick == t) {
if (p && 1 == s) {
d(t, "CocosJs did run callback on il ad clicked event.", a.Function_Doctor_IL_Show_AdId);
r(a.Action_Doctor_Ad_IL_DidClick_Reply, a.Function_Doctor_IL_Show_AdId, "tell the il didclick event to doctor.");
return;
}
A = !1;
if (null != (g = u.get(c))) {
if (null != (y = g.interstitialShowCall) && "function" == typeof y) {
y(f.AdEventType.INTERSTITIAL_EVENT_DID_CLICK, c);
if (p) {
A = !0;
d(t, "CocosJs did run callback on il ad clicked event at " + c, c);
}
}
}
p && 0 == A && d(t, "CocosJs not run callback on il ad clicked event at " + c, c);
} else if (a.Function_Banner_DidRemove == t) {
if (null != (g = u.get(c))) {
null != (y = g.bannerEventCall) && "function" == typeof y && y(f.AdEventType.BANNER_EVENT_DID_REMOVED, c);
}
u.remove(c);
} else if (a.Function_Banner_DidClick == t) {
if (null != (g = u.get(c))) {
null != (y = g.bannerEventCall) && "function" == typeof y && y(f.AdEventType.BANNER_EVENT_DID_CLICK, c);
}
} else if (a.Function_Banner_DidShow == t) {
if (null != (g = u.get(c))) {
null != (y = g.bannerEventCall) && "function" == typeof y && y(f.AdEventType.BANNER_EVENT_DID_SHOW, c);
}
} else if (a.Function_Icon_DidLoad == t) {
if (null != (g = u.get(c))) {
null != (y = g.iconEventCall) && "function" == typeof y && y(f.AdEventType.ICON_EVENT_DID_LOAD, c);
}
} else if (a.Function_Icon_DidLoadFail == t) {
if (null != (g = u.get(c))) {
null != (y = g.iconEventCall) && "function" == typeof y && y(f.AdEventType.ICON_EVENT_DID_LOADFAIL, c);
}
} else if (a.Function_Icon_DidShow == t) {
if (null != (g = u.get(c))) {
null != (y = g.iconEventCall) && "function" == typeof y && y(f.AdEventType.ICON_EVENT_DID_SHOW, c);
}
} else if (a.Function_Icon_DidClick == t) {
var g;
if (null != (g = u.get(c))) {
null != (y = g.iconEventCall) && "function" == typeof y && y(f.AdEventType.ICON_EVENT_DID_CLICK, c);
}
}
}
}
},
Function_Receive_Callback: "receive_callback",
Function_Reward_WillOpen: "reward_willopen",
Function_Reward_DidOpen: "reward_didopen",
Function_Reward_DidClick: "reward_didclick",
Function_Reward_DidClose: "reward_didclose",
Function_Reward_DidGivien: "reward_didgiven",
Function_Reward_DidAbandon: "reward_didabandon",
Function_Interstitial_Willshow: "interstitial_willshow",
Function_Interstitial_Didshow: "interstitial_didshow",
Function_Interstitial_Didclose: "interstitial_didclose",
Function_Interstitial_Didclick: "interstitial_didclick",
Function_Banner_DidShow: "banner_didshow",
Function_Banner_DidClick: "banner_didclick",
Function_Banner_DidRemove: "banner_didremove",
Function_Reward_DidLoadFail: "reward_didloadfail",
Function_Reward_DidLoadSuccess: "reward_didloadsuccess",
Function_Interstitial_DidLoadFail: "interstitial_didloadfail",
Function_Interstitial_DidLoadSuccess: "interstitial_didloadsuccess",
Function_Icon_DidLoad: "icon_didload",
Function_Icon_DidLoadFail: "icon_didloadfail",
Function_Icon_DidShow: "icon_didshow",
Function_Icon_DidClick: "icon_didclick",
Action_Doctor_ON_DUTY: "auto_ad_checking_doctor_on_duty",
Action_Doctor_OFF_DUTY: "auto_ad_checking_doctor_off_duty",
Action_Doctor_Ad_IL_LoadOk_Reply: "auto_ad_il_load_ok_reply",
Action_Doctor_Ad_IL_LoadFail_Reply: "auto_ad_il_load_fail_reply",
Action_Doctor_Ad_IL_WillShow_Reply: "auto_ad_il_willshow_reply",
Action_Doctor_Ad_IL_DidShow_Reply: "auto_ad_il_didshow_reply",
Action_Doctor_Ad_IL_DidClick_Reply: "auto_ad_il_didclick_reply",
Action_Doctor_Ad_IL_DidClose_Reply: "auto_ad_il_didclose_reply",
Action_Doctor_Ad_RD_LoadOk_Reply: "auto_ad_rd_load_ok_reply",
Action_Doctor_Ad_RD_LoadFail_Reply: "auto_ad_rd_load_fail_reply",
Action_Doctor_Ad_RD_WillShow_Reply: "auto_ad_rd_willshow_reply",
Action_Doctor_Ad_RD_DidShow_Reply: "auto_ad_rd_didshow_reply",
Action_Doctor_Ad_RD_DidClick_Reply: "auto_ad_rd_didclick_reply",
Action_Doctor_Ad_RD_DidClose_Reply: "auto_ad_rd_didclose_reply",
Action_Doctor_Ad_RD_Given_Reply: "auto_ad_rd_reward_given_reply",
Action_Doctor_Ad_RD_Cancel_Reply: "auto_ad_rd_reward_cancel_reply",
Function_Doctor_IL_Show_AdId: "auto_sample_ad_il_show_placeid",
Function_Doctor_RD_Show_AdId: "auto_sample_ad_rd_show_placeid",
Function_Doctor_IL_Show_Request: "invoke_plugin_ad_il_show_request",
Function_Doctor_RD_Show_Request: "invoke_plugin_ad_rd_show_request",
Function_Doctor_IL_Load_Request: "invoke_plugin_ad_il_load_request",
Function_Doctor_RD_Load_Request: "invoke_plugin_ad_rd_load_request"
}, u = {
map: new Object(),
length: 0,
rewardLoadFailCall: null,
rewardLoadSuccessCall: null,
rewardShowCall: null,
backPressedCall: null,
resetRewardLoadCallback: function() {
this.rewardLoadFailCall = null;
this.rewardLoadSuccessCall = null;
},
size: function() {
return this.length;
},
put: function(e, n) {
this.map["_" + e] || ++this.length;
this.map["_" + e] = n;
},
remove: function(e) {
if (this.map["_" + e]) {
--this.length;
return delete this.map["_" + e];
}
return !1;
},
exist: function(e) {
return !!this.map["_" + e];
},
get: function(e) {
return this.map["_" + e] ? this.map["_" + e] : null;
},
print: function() {
var e = "";
for (var n in this.map) e += "/n" + n + "  Value:" + this.map[n];
l();
return e;
},
test: function() {
this.put("1", function() {});
this.put("2", function(e) {
cc.log("===> js map function call at 2, v type: %s", "undefined" == typeof e ? "undefined" : o(e));
});
this.put("4", function() {});
l(this.exist("1"));
l(this.exist("3"));
var e = this.get("2");
e && e("========================");
this.print();
this.remove("1");
this.remove("3");
l(this.size());
}
}, _ = function() {
cc.sys.os === cc.sys.OS_IOS && null != f ? void 0 != f.openupbridge && null != f.openupbridge || (f.openupbridge = t) : cc.sys.os === cc.sys.OS_ANDROID && null != f && (void 0 != f.openupbridge && null != f.openupbridge || (f.openupbridge = c));
}, p = {
initSdkSuccessed: !1,
initVokeCall: null,
initSdkCallback: function(e) {
"true" != e && 1 != e || (this.initSdkSuccessed = !0);
cc.log("===> js initSdkCallback..., %s", e);
void 0 != this.initVokeCall && null != this.initVokeCall && "function" == typeof this.initVokeCall && this.initVokeCall(this.initSdkSuccessed);
void 0 != this.initVokeCall && (this.initVokeCall = null);
},
vokeMethod: function(e) {
a.handleVokeParams(e);
},
vokeILReadyMethod: function(e, n) {
this.handleILReadyMethod(e, n);
},
handleILReadyMethod: function(e, n) {
var i = "ILReady_" + e, o = u.get(i);
if (null != o) {
u.remove(i);
if ("function" == typeof o) {
var t = !1;
"true" != n && 1 != n || (t = !0);
o(t);
}
}
}
}, f = f || {
openupbridge: null,
initSdk: function(e, n, i, o) {
if (1 != cc.bridgeInterface.initSdkSuccessed) {
if (void 0 != o && null != o && "function" == typeof o) {
l();
cc.bridgeInterface.initVokeCall = o;
}
var t = "cc.bridgeInterface.vokeMethod", c = "cc.bridgeInterface.initSdkCallback";
_();
if (cc.sys.os === cc.sys.OS_IOS) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == n || "" == n) {
cc.log("===> js initSdk failed, iosAppKey is undefined or empty.");
return;
}
if ("string" != typeof n) {
cc.log("===> js initSdk failed, iosAppKey is not string type.");
return;
}
if (void 0 == i || 0 != i && 1 != i && 2 != i) {
cc.log("===> js initSdk WARNING: iosZone iswrong value, will be setted to 0");
i = 0;
}
this.openupbridge.setShowLog(!1);
this.openupbridge.initIosSDK(n, i, t, c);
}
} else if (cc.sys.os === cc.sys.OS_ANDROID) {
if (void 0 == e && "" == e) {
l();
return;
}
if (void 0 != this.openupbridge && null != this.openupbridge) {
this.openupbridge.setShowLog(!1);
this.openupbridge.initAndroidSDK(e, t, c);
}
}
} else l();
},
initAbtConfigJson: function(e, n, i, o, t, c, s) {
var l = null;
if (void 0 != s && null != s && s instanceof Array) {
var d = s.length;
l = '{"array":[';
for (var r = 0; r < d; r++) {
l += '"' + s[r];
l += r < d - 1 ? '",' : '"]}';
}
}
void 0 == n && (n = !1);
void 0 == i && (i = 0);
void 0 == o && (o = "");
void 0 == t && (t = "");
void 0 == c && (c = -1);
cc.sys.os === cc.sys.OS_IOS ? void 0 != this.openupbridge && null != this.openupbridge && this.openupbridge.initIosAbtConfigJson(e, n, i, o, t, c, l) : cc.sys.os === cc.sys.OS_ANDROID && void 0 != this.openupbridge && null != this.openupbridge && this.openupbridge.initAndroidAbtConfigJson(e, n, i, o, t, c, l);
},
getAbtConfig: function(e) {
if (void 0 != e && null != e && "string" == typeof e) if (cc.sys.os === cc.sys.OS_IOS) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
return "" == (n = this.openupbridge.getIosAbtConfig(e)) ? null : n;
}
} else if (cc.sys.os === cc.sys.OS_ANDROID && void 0 != this.openupbridge && null != this.openupbridge) {
var n;
return "" == (n = this.openupbridge.getAndroidAbtConfig(e)) ? null : n;
}
return null;
},
showRewardDebugUI: function() {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.showIosRewardDebugUI() : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.showAndroidRewardDebugUI());
},
setRewardVideoLoadCallback: function(e, n) {
if (void 0 != e && null != e && "function" == typeof e) if (void 0 != n && null != n && "function" == typeof n) {
u.rewardLoadFailCall = void 0 == n ? null : n;
u.rewardLoadSuccessCall = void 0 == e ? null : e;
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.setIosRewardVideoLoadCallback() : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.setAndroidRewardVideoLoadCallback());
} else l(); else l();
},
setRewardVideoShowCallback: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e || "function" != typeof e) {
l();
return;
}
u.rewardShowCall = e;
}
},
isRewardReady: function() {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (cc.sys.os === cc.sys.OS_IOS) return this.openupbridge.isIosRewardReady();
if (cc.sys.os === cc.sys.OS_ANDROID) return this.openupbridge.isAndroidRewardReady();
}
return !1;
},
showRewardVideo: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
void 0 == e && (e = null);
cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.showIosRewardVideo(e) : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.showAndroidRewardVideo(e);
}
},
isInterstitialReadyAsyn: function(e, n) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
if (n == e || null == n) {
l();
return;
}
if ("function" != typeof n) {
l();
return;
}
var i = "ILReady_" + e;
u.put(i, n);
cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.isIosInterstitialReadyAsyn(e, "cc.bridgeInterface.vokeILReadyMethod") : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.isAndroidInterstitialReadyAsyn(e, "cc.bridgeInterface.vokeILReadyMethod");
}
},
isInterstitialReady: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
if (cc.sys.os === cc.sys.OS_IOS) return this.openupbridge.isIosInterstitialReady(e);
if (cc.sys.os === cc.sys.OS_ANDROID) return this.openupbridge.isAndroidInterstitialReady(e);
}
return !1;
},
showInterstitialAd: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.showIosInterstitialAd(e) : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.showAndroidInterstitialAd(e);
}
},
setInterstitialLoadCallback: function(e, n, i) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
if (void 0 == n || null == n || "function" != typeof n) {
l();
return;
}
if (void 0 == i || null == i || "function" != typeof i) {
l();
return;
}
var o = e + "_Interstitial", t = u.get(o) || {};
t.interstitialLoadSuccessCall = n;
t.interstitialLoadFailCall = i;
u.put(o, t);
l(u.size());
cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.setIosInterstitialLoadCallback(e) : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.setAndroidInterstitialLoadCallback(e);
}
},
setInterstitialShowCallback: function(e, n) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
if (void 0 == n || null == n || "function" != typeof n) {
l();
return;
}
var i = e, o = u.get(i) || {};
o.interstitialShowCall = n;
u.put(i, o);
}
},
showInterstitialDebugUI: function() {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.showIosInterstitialDebugUI() : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.showAndroidInterstitialDebugUI());
},
removeBannerAdAt: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.removeIosBannerAdAt(e) : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.removeAndroidBannerAdAt(e);
}
},
showBannerAdAtTop: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.showIosBannerAdAtTop(e) : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.showAndroidBannerAdAtTop(e);
}
},
showBannerAdAtBottom: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.showIosBannerAdAtBottom(e) : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.showAndroidBannerAdAtBottom(e);
}
},
hideBannerAdAtTop: function() {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.hideIosBannerAdAtTop() : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.hideAndroidBannerAdAtTop());
},
hideBannerAdAtBottom: function() {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.hideIosBannerAdAtBottom() : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.hideAndroidBannerAdAtBottom());
},
setTopBannerPadingForIphoneX: function(e) {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.setIosTopBannerPading(e) : (cc.sys.os, 
cc.sys.OS_ANDROID));
},
setBannerShowCallback: function(e, n) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
if (void 0 == n || null == n || "function" != typeof n) {
l();
return;
}
var i = u.get(e) || {};
i.bannerEventCall = n;
u.put(e, i);
}
},
setIconCallback: function(e, n) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
if (void 0 == n || null == n || "function" != typeof n) {
l();
return;
}
var i = u.get(e) || {};
i.iconEventCall = n;
u.put(e, i);
}
},
showIconAd: function(e, n, i, o, t, c) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == c || null == c) {
l();
return;
}
cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.showAndroidIconAdAt(e, n, i, o, t, c);
cc.sys.os === cc.sys.OS_IOS && this.openupbridge.showIosIconAdAt(e, n, i, o, t, c);
}
},
removeIconAd: function(e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (void 0 == e || null == e) {
l();
return;
}
cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.removeAndroidIconAdAt(e);
cc.sys.os === cc.sys.OS_IOS && this.openupbridge.removeIosIconAdAt(e);
}
},
loadAdsByManual: function() {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.loadIosAdsByManual() : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.loadAndroidAdsByManual());
},
exitApp: function() {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_IOS ? this.openupbridge.exitIosApp() : cc.sys.os === cc.sys.OS_ANDROID && this.openupbridge.exitAndroidApp());
},
setManifestPackageName: function(e) {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.setAndroidManifestPackageName(e) : (cc.sys.os, 
cc.sys.OS_ANDROID));
},
onBackPressed: function() {
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.onAndroidBackPressed() : (cc.sys.os, 
cc.sys.OS_IOS));
},
setCustomerId: function(e) {
_();
if (void 0 != this.openupbridge && null != this.openupbridge) if (cc.sys.os === cc.sys.OS_ANDROID) {
if (void 0 == e || null == e) {
l();
return;
}
this.openupbridge.setAndroidCustomerId(e);
} else cc.sys.os, cc.sys.OS_IOS;
},
updateAccessPrivacyInfoStatus: function(e) {
_();
void 0 != e && null != e && (e == f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown || e == f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted || e == f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined) ? void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.updateAndroidAccessPrivacyInfoStatus(e) : cc.sys.os === cc.sys.OS_IOS && this.openupbridge.updateIosAccessPrivacyInfoStatus(e)) : l();
},
getAccessPrivacyInfoStatus: function() {
_();
var e = 0;
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? e = this.openupbridge.getAndroidAccessPrivacyInfoStatus() : cc.sys.os === cc.sys.OS_IOS && (e = this.openupbridge.getIosAccessPrivacyInfoStatus()));
return 1 == e ? f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted : 2 == e ? f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined : f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown;
},
notifyAccessPrivacyInfoStatus: function(e) {
_();
if (void 0 != e && null != e) if ("function" == typeof e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
f.GDPRPermissionEnum.functionId = f.GDPRPermissionEnum.functionId + 1;
var n = f.GDPRPermissionEnum.functionId, i = "" + n;
u.put(i, e);
var o = "openup.GDPRPermissionEnum.javaCall";
cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.notifyAndroidAccessPrivacyInfoStatus(o, n) : cc.sys.os === cc.sys.OS_IOS && this.openupbridge.notifyIosAccessPrivacyInfoStatus(o, i);
}
} else l(); else l();
},
isEuropeanUnionUser: function(e) {
_();
if (void 0 != e && null != e) if ("function" == typeof e) {
if (void 0 != this.openupbridge && null != this.openupbridge) {
f.GDPRPermissionEnum.functionId = f.GDPRPermissionEnum.functionId + 1;
var n = f.GDPRPermissionEnum.functionId, i = "" + n;
u.put(i, e);
var o = "openup.GDPRPermissionEnum.javaCall";
cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.isAndroidEuropeanUnionUser(o, n) : cc.sys.os === cc.sys.OS_IOS && this.openupbridge.isIosEuropeanUnionUser(o, i);
}
} else l(); else l();
},
isOnlineDebugReportEnable: function() {
return (cc.sys.os === cc.sys.OS_ANDROID || cc.sys.os === cc.sys.OS_IOS) && this.openupbridge.isOnlineDebugReportEnable();
},
onlineDebugReport: function(e, n, i) {
cc.sys.os !== cc.sys.OS_ANDROID && cc.sys.os !== cc.sys.OS_IOS || (a.Function_Receive_Callback == e ? this.openupbridge.reportIvokePluginMethodReceive(n) : a.Function_Reward_WillOpen == e || (a.Function_Reward_DidOpen == e ? this.openupbridge.reportRDShowDid(n) : a.Function_Reward_DidClick == e ? this.openupbridge.reportRDRewardClick(n) : a.Function_Reward_DidClose == e ? this.openupbridge.reportRDRewardClose(n) : a.Function_Reward_DidGivien == e ? this.openupbridge.reportRDRewardGiven(n) : a.Function_Reward_DidAbandon == e ? this.openupbridge.reportRDRewardCancel(n) : a.Function_Interstitial_Willshow == e || (a.Function_Interstitial_Didshow == e ? this.openupbridge.reportILShowDid(n, i) : a.Function_Interstitial_Didclick == e ? this.openupbridge.reportILClick(n, i) : a.Function_Interstitial_Didclose == e && this.openupbridge.reportILClose(n, i))));
},
isLogOpened: function() {
if (void 0 != this.openupbridge && null != this.openupbridge) {
if (cc.sys.os === cc.sys.OS_IOS) return this.openupbridge.isIosLogOpened();
if (cc.sys.os === cc.sys.OS_ANDROID) return this.openupbridge.isAndroidLogOpened();
}
return !1;
},
autoOneKeyInspect: function() {
l();
void 0 != this.openupbridge && null != this.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.autoOneKeyInspectByAndroid() : cc.sys.os === cc.sys.OS_IOS && this.openupbridge.autoOneKeyInspectByIos());
},
setAppsFlyerUID: function(e) {
_();
0 != arguments.length && void 0 != e && "string" == typeof e && "" != e ? void 0 != this.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.setAppsFlyerUIDByAndroid(e) : cc.sys.os === cc.sys.OS_IOS && this.openupbridge.setAppsFlyerUIDByIos(e)) : l();
},
setAdjustId: function(e) {
_();
0 != arguments.length && void 0 != e && "string" == typeof e && "" != e ? void 0 != this.openupbridge && (cc.sys.os === cc.sys.OS_ANDROID ? this.openupbridge.setAdjustIdByAndroid(e) : cc.sys.os === cc.sys.OS_IOS && this.openupbridge.setAdjustIdByIos(e)) : l();
}
};
f.GDPRPermissionEnum = {
functionId: 0,
javaCall: function(e, n) {
var i = "" + e, o = u.get(i);
if (null != o) {
null != o && "function" == typeof o && o(n);
u.remove(i);
}
}
};
f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusUnkown = 0;
f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusAccepted = 1;
f.GDPRPermissionEnum.UPAccessPrivacyInfoStatusDefined = 2;
f.AdEventType = {};
f.AdEventType.VIDEO_EVENT_DID_SHOW = 0;
f.AdEventType.VIDEO_EVENT_DID_CLICK = 1;
f.AdEventType.VIDEO_EVENT_DID_CLOSE = 2;
f.AdEventType.VIDEO_EVENT_DID_GIVEN_REWARD = 3;
f.AdEventType.VIDEO_EVENT_DID_ABANDON_REWARD = 4;
f.AdEventType.INTERSTITIAL_EVENT_DID_SHOW = 5;
f.AdEventType.INTERSTITIAL_EVENT_DID_CLICK = 6;
f.AdEventType.INTERSTITIAL_EVENT_DID_CLOSE = 7;
f.AdEventType.BANNER_EVENT_DID_SHOW = 8;
f.AdEventType.BANNER_EVENT_DID_CLICK = 9;
f.AdEventType.BANNER_EVENT_DID_REMOVED = 10;
f.AdEventType.ICON_EVENT_DID_LOAD = 16;
f.AdEventType.ICON_EVENT_DID_LOADFAIL = 17;
f.AdEventType.ICON_EVENT_DID_SHOW = 18;
f.AdEventType.ICON_EVENT_DID_CLICK = 19;
f.AdEventType.VIDEO_EVENT_WILL_SHOW = 20;
f.AdEventType.INTERSTITIAL_EVENT_WILL_SHOW = 21;
n.exports.openup = f;
n.exports.bridgeInterface = p;
cc._RF.pop();
}, {
OpenUpAndroid: "OpenUpAndroid",
OpenUpIos: "OpenUpIos"
} ],
"use_v2.1.x_cc.Action": [ function(e, n, i) {
"use strict";
cc._RF.push(n, "1207bbX+aRFrqA8Y0qtUg2C", "use_v2.1.x_cc.Action");
cc.macro.ROTATE_ACTION_CCW = !0;
cc._RF.pop();
}, {} ]
}, {}, [ "HelloWorld", "OpenUpAndroid", "OpenUpIos", "OpenUpSDK", "use_v2.1.x_cc.Action" ]);