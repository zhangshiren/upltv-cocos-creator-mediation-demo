# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in E:\developSoftware\Android\SDK/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Proguard Cocos2d-x-lite for release
-keep public class org.cocos2dx.** { *; }
-dontwarn org.cocos2dx.**

# Proguard Apache HTTP for release
-keep class org.apache.http.** { *; }
-dontwarn org.apache.http.**

# Proguard Android Webivew for release. you can comment if you are not using a webview
-keep public class android.net.http.SslError
-keep public class android.webkit.WebViewClient

-dontwarn android.webkit.WebView
-dontwarn android.net.http.SslError
-dontwarn android.webkit.WebViewClient

# keep anysdk for release. you can comment if you are not using anysdk
-keep public class com.anysdk.** { *; }
-dontwarn com.anysdk.**

# 不做预校验，preverify是proguard的四个步骤之一，Android不需要preverify，去掉这一步能够加快混淆速度。
-dontpreverify

# avidly
-keep class com.avidly.ads.** {*;}
-keep class com.up.ads.** {*;}
-keep interface com.up.ads.** {*;}
-keep class com.avidly.channel.** { *; }
-keep class com.up.channel.** { *; }
-keep class com.sm.avid.decode.** {*;}
-keep class com.avidly.playablead.ext.** {*;}
-keep interface com.avidly.ads.** {*;}
-keep interface com.sm.avid.decode.** {*;}
-keep class com.hola.sdk.* {*;}
-keep class com.statistics.channel.* {*;}
-keep class com.aly.analysis.sdk.api.* {*;}
-keepclasseswithmembernames class * {
    native <methods>;
}
-dontwarn com.avidly.**
-dontwarn com.up.**
-keep class com.statistics.channel.* {*;}
-keep class com.google.ads.mediation.** {*;}
-dontwarn com.google.ads.mediation.**
# avidly end

# support
-keep public class * extends android.support.v4.app.Fragment
-keep class android.support.** {*;}
-keep class com.google.gson.** {*;}
-dontwarn android.support.**
# support end

# facebook
-keep class com.facebook.ads.InterstitialAd {*;}
-keep class com.facebook.ads.AdView {*;}
-keep class com.facebook.ads.Ad {*;}
-keep class com.facebook.ads.RewardedVideoAd {*;}
-keep class com.facebook.ads.AdListener {*;}
-keep class com.facebook.ads.BuildConfig {*;}
-dontwarn com.facebook.ads.internal.**
-keep class com.facebook.bidding.** {*;}
-keep class com.google.android.exoplayer2.** {*;}
-dontwarn com.google.android.exoplayer2.**
# facebook end

# google
-keep class * extends java.util.ListResourceBundle {
    protected java.lang.Object[][] getContents();
}
-keep public class com.google.android.gms.common.internal.safeparcel.SafeParcelable {
    public static final *** NULL;
}
-keepclassmembers enum * {
  public static **[] values();
  public static ** valueOf(java.lang.String);
}
-keepnames @com.google.android.gms.common.annotation.KeepName class *
-keepclassmembernames class * {
    @com.google.android.gms.common.annotation.KeepName *;
}
-keepnames class * implements android.os.Parcelable {
    public static final ** CREATOR;
}
-keep class * extends java.util.ListResourceBundle {
    protected java.lang.Object[][] getContents();
}
-keep class com.google.android.gms.ads.** {*;}
-keep class com.google.android.gms.common.** {*;}
-dontwarn com.google.android.gms.**
-dontwarn com.google.protobuf.**
-keep class com.google.ads.mediation.** {*;}
-dontwarn com.google.ads.mediation.**
# google end

# adcolony
-keep class com.adcolony.** { *; }
-dontwarn com.adcolony.**
-dontnote com.adcolony.**
# adcolony end

# vungle
-keep class com.vungle.warren.** { *; }
-keep class com.moat.** { *; }
-keep class com.google.android.gms.internal.** { *; }
-dontwarn com.vungle.warren.error.VungleError$ErrorCode
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-dontwarn retrofit2.Platform$Java8
-keepattributes Signature
-keepattributes *Annotation*
-dontwarn sun.misc.**
-dontwarn com.vungle.warren.**
-dontwarn okio.**
-dontwarn okhttp3.**
-dontwarn retrofit2.**
-dontwarn com.moat.**
-dontwarn com.google.android.gms.ads.identifier.**
-dontwarn org.codehaus.mojo.animal_sniffer.IgnoreJRERequirement
-keeppackagenames 'net.vrallev.android.cat'
-keeppackagenames 'retrofit2.converter.gson'
-keeppackagenames 'com.tonyodev.fetch'
-keeppackagenames 'okhttp3.logging'
-keeppackagenames 'okhttp3'
-keeppackagenames 'okio'
-keeppackagenames 'retrofit2'
# vungle end

# unity
-keepattributes SourceFile,LineNumberTable
-keepattributes JavascriptInterface
-keep class android.webkit.JavascriptInterface {*;}
-keep class com.unity3d.ads.** {*;}
-keep class com.unity3d.services.** {*;}
-dontwarn com.google.ar.core.**
# unity end

# applovin
-keep class com.applovin.** { *; }
-dontwarn com.applovin.**
# applovin end

# chartboost
-keep class com.chartboost.** { *; }
-dontwarn com.chartboost.**
# chartboost end

# playable
-keep class com.sw.playablead.app.** { *; }
# playable end

# ironsource
-keep class com.ironsource.mediationsdk.IronSource
-keep class com.moat.** { *; }
-dontwarn com.ironsource.mediationsdk.**
-dontwarn com.ironsource.adapters.**
-dontwarn com.moat.**
-keepclassmembers class com.ironsource.sdk.controller.IronSourceWebView$JSInterface {
    public *;
}
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator *;
}
-keep public class com.google.android.gms.ads.** {
   public *;
}
-keep public class com.google.ads.** {
   public *;
}
-keep class com.ironsource.adapters.** { *;
}
# ironsource end

# vk
-keep class com.my.target.** {*;}
-dontwarn com.my.target.**
-dontwarn com.mopub.**
# vk end

# maio
-keep class jp.maio.sdk.android.** { *; }
-dontwarn jp.maio.sdk.android.**
-dontnote jp.maio.sdk.android.**
# maio end

# nend
-keep class net.nend.android.** { *; }
-dontwarn net.nend.android.**
-dontnote net.nend.android.**
# nend end

# amazon
-keep class com.amazon.device.ads.** { *; }
# amazon end
