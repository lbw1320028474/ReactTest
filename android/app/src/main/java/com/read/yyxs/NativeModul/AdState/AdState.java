package com.read.yyxs.NativeModul.AdState;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;
import com.read.yyxs.MainActivity;

/**
 * Created by bangwen.lei on 2018/1/9.
 */

public class AdState extends ReactContextBaseJavaModule {
    public static boolean canCloseAd = false;
    public AdState(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AdState";
    }

    @ReactMethod
    public void setCanClose(float canclose) {
        if(AdState.canCloseAd){
            RCTSplashScreen.removeSplashScreen(getCurrentActivity(), 1, 500);
        }else{
            AdState.canCloseAd = true;
        }
    }

}
