package com.read.yyxs.Utiles;

import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;

import java.util.List;

/**
 * Created by xuxiaolei on 2018/1/16.
 */

public class AppUtils {
    public static void openApp(Context context, String packageName) {
        try {
//if(!AppUtil.isAppOnForeground(mApplication, mApplication.getPackageName())){
            //PLog.w("NovelLog", "收到消息:应用不在前台");
            Intent intent = context.getPackageManager().getLaunchIntentForPackage(packageName);
            // 这里如果intent为空，就说名没有安装要跳转的应用嘛
            if (intent != null) {
                // 这里跟Activity传递参数一样的嘛，不要担心怎么传递参数，还有接收参数也是跟Activity和Activity传参数一样
                context.startActivity(intent);
            } else {
                            /*// 没有安装要跳转的app应用，提醒一下
                            Toast.makeText(getApplicationContext(), "哟，赶紧下载安装这个APP吧", Toast.LENGTH_LONG).show();*/
            }
        } catch (Exception e) {

        }
    }


    public static void killApp() {
        android.os.Process.killProcess(android.os.Process.myPid());
        System.exit(0);
    }

    //在进程中去寻找当前APP的信息，判断是否在前台运行
    public static boolean isAppOnForeground(Context context, String packageName) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(
                Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
        if (appProcesses == null)
            return false;
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.processName.equals(packageName)
                    && appProcess.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND) {
                return true;
            }
        }
        return false;
    }
}
