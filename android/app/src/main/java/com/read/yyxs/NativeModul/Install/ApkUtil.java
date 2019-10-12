package com.read.yyxs.NativeModul.Install;

import android.content.Intent;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.read.yyxs.Utiles.AppUtils;

import java.io.File;

/**
 * 提供js端调用方法来安装APK
 * Created by bangwen.lei on 2018/1/9.
 */

public class ApkUtil extends ReactContextBaseJavaModule {
    public ApkUtil(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ApkUtil";
    }

    @ReactMethod
    public void killApp(){
        AppUtils.killApp();
    }

    @ReactMethod
    public void fileExist(String filePath, Callback callback){
        if(callback == null){
            return;
        }
        try{
            if(TextUtils.isEmpty(filePath)){
                callback.invoke(false);
            }else{
                File file = new File(filePath);
                if(file.exists() && file.isFile()){
                    callback.invoke(true);
                }else{
                    callback.invoke(false);
                }
            }
        }catch (Exception e){
            callback.invoke(false);
        }
    }

    @ReactMethod
    public void installApk(String apkPath) {
        try {
            if (TextUtils.isEmpty(apkPath)) {
                return;
            } else {
                File apkFile = new File(apkPath);
                if (apkFile.exists() && apkFile.isFile()) {
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setDataAndType(Uri.fromFile(apkFile), "application/vnd.android.package-archive");
                    getCurrentActivity().startActivity(intent);
                }
            }
        } catch (Exception e) {
            if (e != null) {
                Log.e("ApkUtil", e.toString());
            }

        }
    }
//
//    @ReactMethod
//    public void qqIsinstall(String apkPath) {
//        try {
//            if (TextUtils.isEmpty(apkPath)) {
//                return;
//            } else {
//                File apkFile = new File(apkPath);
//                if (apkFile.exists() && apkFile.isFile()) {
//                    Intent intent = new Intent(Intent.ACTION_VIEW);
//                    intent.setDataAndType(Uri.fromFile(apkFile), "application/vnd.android.package-archive");
//                    getCurrentActivity().startActivity(intent);
//                }
//            }
//        } catch (Exception e) {
//            if (e != null) {
//                Log.e("ApkUtil", e.toString());
//            }
//
//        }
//    }
}
