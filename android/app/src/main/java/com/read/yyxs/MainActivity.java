package com.read.yyxs;


import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;

import com.baidu.mobads.SplashAd;
import com.baidu.mobads.SplashAdListener;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;

import com.read.yyxs.NativeModul.AdState.AdState;
import com.read.yyxs.NativeModul.Umeng.PushModule;
import com.read.yyxs.NativeModul.VolumKey.Volumn;
import com.umeng.analytics.MobclickAgent;
import com.umeng.message.PushAgent;


public class MainActivity extends ReactActivity {

    /**
     * 当设置开屏可点击时，需要等待跳转页面关闭后，再切换至您的主窗口。故此时需要增加canJumpImmediately判断。 另外，点击开屏还需要在onResume中调用jumpWhenCanClick接口。
     */
    public boolean canJumpImmediately = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /**
         * ANDROID第一次安装打开,home键再点击启动,程序重复启动
         * 判断程序没有不包含flag：FLAG_ACTIVITY_RESET_TASK_IF_NEEDED 关闭activity
         * 再重新启动，屏蔽原有问题
         */
        super.onCreate(savedInstanceState);

//        if ((getIntent().getFlags() & Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED) == 0) {
//            Log.e("MoposnsLogoActivity",
//                    "MoposnsLogoActivity, without flag FLAG_ACTIVITY_RESET_TASK_IF_NEEDED");
//            final Intent intent = new Intent();
//            intent.addCategory(Intent.CATEGORY_LAUNCHER);
//            intent.setAction(Intent.ACTION_MAIN);
//            intent.setComponent(new ComponentName(getPackageName(),
//                    MainActivity.class.getName()));
//            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//            intent.addFlags(Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
//
//            finish();
//            startActivity(intent);
//            return;
//        }


        View containerView = RCTSplashScreen.openSplashScreen(MainActivity.this, true);   //open splashscreen
        showBaiduSplashAd(containerView);
        initUmeng();

    }

    private void showBaiduSplashAd(View containerView) {
        // the observer of AD
        SplashAdListener listener = new SplashAdListener() {
            @Override
            public void onAdDismissed() {
                Log.i("RSplashActivity", "onAdDismissed");
                jumpWhenCanClick(); // 跳转至您的应用主界面
            }

            @Override
            public void onAdFailed(String arg0) {
                Log.i("RSplashActivity", "onAdFailed");
                jump();
            }

            @Override
            public void onAdPresent() {
                Log.i("RSplashActivity", "onAdPresent");
            }

            @Override
            public void onAdClick() {
                Log.i("RSplashActivity", "onAdClick");
                // 设置开屏可接受点击时，该回调可用
            }
        };
        String adPlaceId = "5863255"; // 重要：请填上您的广告位ID，代码位错误会导致无法请求到广告
        // 如果开屏需要支持vr,needRequestVRAd(true)
//        SplashAd.needRequestVRAd(true);
        new SplashAd(MainActivity.this, (ViewGroup) containerView, listener, adPlaceId, true);
    }

    /*原生模块可以在没有被调用的情况下往JavaScript发送事件通知。
    最简单的办法就是通过RCTDeviceEventEmitter，
    这可以通过ReactContext来获得对应的引用，像这样：*/
    public static void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap paramss) {
//        System.out.println("reactContext=" + reactContext);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, paramss);

    }

//    @Override
//    public boolean onKeyUp(int keyCode, KeyEvent event) {
//        return super.onKeyUp(keyCode, event);
//    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN || keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            if (Volumn.valumCanCallBack) {
                return true;
            }
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN) {
            if (Volumn.valumCanCallBack) {
                Volumn.sendVolumnEvent(-1);
                return true;
            }
        } else if (keyCode == KeyEvent.KEYCODE_VOLUME_UP) {
            if (Volumn.valumCanCallBack) {
                Volumn.sendVolumnEvent(1);
                return true;
            }
        } else if (keyCode == KeyEvent.KEYCODE_MENU) {
            if (Volumn.valumCanCallBack) {
                Volumn.sendVolumnEvent(2);
                return true;
            }
        }
        return super.onKeyDown(keyCode, event);

    }

    private void initUmeng() {
        MobclickAgent.setSessionContinueMillis(1000);
        MobclickAgent.setScenarioType(MainActivity.this, MobclickAgent.EScenarioType.E_DUM_NORMAL);
        PushAgent.getInstance(MainActivity.this).onAppStart();
        PushModule.initPushSDK(MainActivity.this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        MobclickAgent.onResume(MainActivity.this);
        Log.i("BaiduXAdSDK", "onResume调用了");
        if (canJumpImmediately) {
            Log.i("BaiduXAdSDK", "关闭广告弹框 from onResume");
            jumpWhenCanClick();
        }
        canJumpImmediately = true;
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPause(MainActivity.this);
        canJumpImmediately = false;
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    private void jumpWhenCanClick() {
        Log.d("test", "this.hasWindowFocus():" + this.hasWindowFocus());
        if (canJumpImmediately) {
//            sendEvent("EVENT_CAN_CLOSE", null);
            Log.i("BaiduXAdSDK", "关闭广告弹框 from jumpWhenCanClick");
            if (AdState.canCloseAd) {
                RCTSplashScreen.removeSplashScreen(MainActivity.this, 1, 500);
            } else {
                AdState.canCloseAd = true;
            }
        } else {
            canJumpImmediately = true;
        }

    }


//    /*原生模块可以在没有被调用的情况下往JavaScript发送事件通知。
//     最简单的办法就是通过RCTDeviceEventEmitter，
//     这可以通过ReactContext来获得对应的引用，像这样：*/
//    public static void setCanCloseSplash(ReactContext reactContext, String eventName, @Nullable WritableMap paramss) {
////        System.out.println("reactContext=" + reactContext);
//        reactContext
//                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(eventName, paramss);
//
//    }


    /**
     * 不可点击的开屏，使用该jump方法，而不是用jumpWhenCanClick
     */
    private void jump() {
//        sendEvent("EVENT_CAN_CLOSE", null);
        Log.i("BaiduXAdSDK", "关闭广告弹框 from jump");
        if (AdState.canCloseAd) {
            RCTSplashScreen.removeSplashScreen(MainActivity.this, 1, 500);
        } else {
            AdState.canCloseAd = true;
        }
    }

    @Override
    protected String getMainComponentName() {
        return "ReactTest";
    }
}
