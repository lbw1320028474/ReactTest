package com.read.yyxs.NativeModul.WebActivity;

import android.content.Intent;
import android.provider.Settings;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.read.yyxs.Activity.WebViewActivity;

/**
 * Created by bangwen.lei on 2018/1/9.
 */

public class WebModul extends ReactContextBaseJavaModule {
    public WebModul(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "WebModul";
    }


    @ReactMethod
    public void openActivity(String url) {
        try {
            getCurrentActivity().startActivity(new Intent(getCurrentActivity(), WebViewActivity.class));
        } catch (Exception e) {

        }
    }


}
