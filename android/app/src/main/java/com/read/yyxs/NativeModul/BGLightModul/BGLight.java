package com.read.yyxs.NativeModul.BGLightModul;

import android.app.Activity;
import android.content.Context;
import android.provider.Settings;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by bangwen.lei on 2018/1/9.
 */

public class BGLight extends ReactContextBaseJavaModule {
    public BGLight(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BGLight";
    }

    @ReactMethod
    public void getBGLigth(Callback successCallBack, Callback failCallBack) {
        try {
            int systemBrightness = 0;
            try {
                systemBrightness = Settings.System.getInt(getCurrentActivity().getContentResolver(), Settings.System.SCREEN_BRIGHTNESS);
            } catch (Settings.SettingNotFoundException e) {
                e.printStackTrace();
            }
            Log.i("BGLight", systemBrightness + " + " + systemBrightness / 255.0 + "");
            successCallBack.invoke(systemBrightness / 255.0);
        } catch (Exception e) {
            Toast.makeText(getReactApplicationContext(), "调用异常", Toast.LENGTH_SHORT).show();
        }


//
//        try {
//            WindowManager.LayoutParams layoutParams = getCurrentActivity().getWindow().getAttributes();
//            successCallBack.invoke(layoutParams.screenBrightness);
//        } catch (Exception e) {
//            failCallBack.invoke(-1);
//            // Toast.makeText(getReactApplicationContext(), "调用异常", Toast.LENGTH_SHORT).show();
//        }
    }

    @ReactMethod
    public void setBGLigth(final float newLigth) {
        try {
            if (newLigth >= 0 && newLigth <= 1) {
                //final Activity currentActivity = getCurrentActivity();
                getCurrentActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //此时已在主线程中，可以更新UI了
                        WindowManager.LayoutParams layoutParams = getCurrentActivity().getWindow().getAttributes();
                        layoutParams.screenBrightness = newLigth;
                        getCurrentActivity().getWindow().setAttributes(layoutParams);
                    }
                });
            }

        } catch (Exception e) {
//            Toast.makeText(getReactApplicationContext(), "调用异常", Toast.LENGTH_SHORT).show();
        }
    }
}
