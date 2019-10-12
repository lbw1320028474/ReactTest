package com.read.yyxs.NativeModul.GiveStar;

import android.content.Context;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.provider.Settings;
import android.text.TextUtils;
import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by bangwen.lei on 2018/1/9.
 */

public class GiveStar extends ReactContextBaseJavaModule {
    public GiveStar(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "GiveStar";
    }

    @ReactMethod
    public void openStar() {
        if (isAppInstalled("com.huawei.appmarket")) { //华为
            launchAppDetail("com.huawei.appmarket");
        } else if (isAppInstalled("com.xiaomi.market")) {  //小米
            launchAppDetail("com.xiaomi.market");
        } else if (isAppInstalled("com.oppo.market")) {  //oppo
            launchAppDetail("com.oppo.market");
        } else if (isAppInstalled("com.bbk.appstore")) {  //vivo
            launchAppDetail("com.bbk.appstore");
        }  else if (isAppInstalled("com.tencent.android.qqdownloader")) {  //应用宝
            launchAppDetail("com.tencent.android.qqdownloader");
        } else if (isAppInstalled("com.qihoo.appstore")) {  //360
            launchAppDetail("com.qihoo.appstore");
        }else {
            Toast.makeText(getCurrentActivity(), "您的手机没有安装Android应用市场", Toast.LENGTH_SHORT).show();
        }
    }


    private boolean isAppInstalled(String pkgname) {
        PackageManager pm = getCurrentActivity().getPackageManager();
        boolean installed = false;
        try {
            pm.getPackageInfo(pkgname, PackageManager.GET_ACTIVITIES);
            installed = true;
        } catch (PackageManager.NameNotFoundException e) {
            installed = false;
        }
        return installed;
    }

//    /**
//     * 获取已安装应用商店的包名列表 * 获取有在AndroidManifest 里面注册<category android:name="android.intent.category.APP_MARKET" />的app * @param context * @return
//     */
//    public ArrayList<String> getInstallAppMarkets(Context context) {
//        //默认的应用市场列表，有些应用市场没有设置APP_MARKET通过隐式搜索不到
//        ArrayList<String> pkgList = new ArrayList<>();
//        pkgList.add("com.xiaomi.market");
//        pkgList.add("com.qihoo.appstore");
//        pkgList.add("com.wandoujia.phoenix2");
//        pkgList.add("com.tencent.android.qqdownloader");
//        pkgList.add("com.taptap");
//        ArrayList<String> pkgs = new ArrayList<String>();
//        if (context == null)
//            return pkgs;
//        Intent intent = new Intent();
//        intent.setAction("android.intent.action.MAIN");
//        intent.addCategory("android.intent.category.APP_MARKET");
//        PackageManager pm = context.getPackageManager();
//        List<ResolveInfo> infos = pm.queryIntentActivities(intent, 0);
//        if (infos == null || infos.size() == 0)
//            return pkgs;
//        int size = infos.size();
//        for (int i = 0; i < size; i++) {
//            String pkgName = "";
//            try {
//                ActivityInfo activityInfo = infos.get(i).activityInfo;
//                pkgName = activityInfo.packageName;
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//            if (!TextUtils.isEmpty(pkgName)) pkgs.add(pkgName); //取两个list并集,去除重复
//        }
//        pkgList.removeAll(pkgs);
//        pkgs.addAll(pkgList);
//        return pkgs;
//    }

    /**
     * 跳转到应用市场app详情界面 * @param appPkg App的包名 * @param marketPkg 应用市场包名
     */
    public void launchAppDetail(String marketPkg) {
        try {
            if (TextUtils.isEmpty(getCurrentActivity().getPackageName())) return;
            Uri uri = Uri.parse("market://details?id=" + getCurrentActivity().getPackageName());
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            if (!TextUtils.isEmpty(marketPkg)) intent.setPackage(marketPkg);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getCurrentActivity().startActivity(intent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void launchAppMarket() {
        try {
            Uri uri = Uri.parse("market://details?id=" + getCurrentActivity().getPackageName());
            Intent intent = new Intent(Intent.ACTION_VIEW, uri);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getCurrentActivity().startActivity(intent);
        } catch (Exception e) {
            Toast.makeText(getCurrentActivity(), "您的手机没有安装Android应用市场", Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        }


    }

}
