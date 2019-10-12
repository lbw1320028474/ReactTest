package com.read.yyxs.NativeModul.VolumKey;


import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.read.yyxs.Utiles.AppUtils;


/**
 * Created by xuxiaolei on 2018/4/29.
 */

public class Volumn extends ReactContextBaseJavaModule {
    public static boolean valumCanCallBack = false;
    public static ReactApplicationContext mContext = null;

    public Volumn(ReactApplicationContext reactContext) {
        super(reactContext);
        Volumn.mContext = reactContext;
    }

    @Override
    public String getName() {
        return "Volumn";
    }

    @ReactMethod
    public void volumnListenerOn() {
        Volumn.valumCanCallBack = true;
    }

    @ReactMethod
    public void volumnListenerOff() {
        Volumn.valumCanCallBack = false;
    }

    /**
     *
     * @param eventType -1：音量-   1：音量+
     */
    public static void sendVolumnEvent(int eventType) {
        try {
            if (Volumn.mContext != null) {
                Volumn.mContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("volumnKeyEvent", eventType);
            }
        } catch (Exception e) {
            Log.e("Volumn", "" + e);
        }
//        reactContext
//                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit(eventName, paramss);
    }
}
