package com.read.yyxs;

import android.app.Application;
import android.content.Context;
import android.widget.Toast;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactnativecomponent.splashscreen.RCTSplashScreenPackage;
import com.read.yyxs.NativeModul.AdState.AdStatePackage;
import com.read.yyxs.NativeModul.BGLightModul.BGLightPackage;
import com.read.yyxs.NativeModul.DeviceInfo.MyDeviceInfoPackage;
import com.read.yyxs.NativeModul.GiveStar.GiveStarPackage;
import com.read.yyxs.NativeModul.Install.ApkUtilPackage;
import com.read.yyxs.NativeModul.Umeng.DplusReactPackage;
import com.read.yyxs.NativeModul.Umeng.PushModule;
import com.read.yyxs.NativeModul.VolumKey.VolumnPackage;
import com.read.yyxs.NativeModul.WebActivity.WebModulPackage;
import com.read.yyxs.Utiles.AppUtils;
import com.rnfs.RNFSPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.puti.nativemoduleumeng.UMengPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.read.yyxs.Utiles.BundleUtils;
import com.remobile.zip.RCTZipPackage;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.message.IUmengRegisterCallback;
import com.umeng.message.PushAgent;
import com.umeng.message.UmengNotificationClickHandler;
import com.umeng.message.entity.UMessage;
import com.umeng.socialize.utils.Log;

import org.pgsqlite.SQLitePluginPackage;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

public class MainApplication extends Application implements ReactApplication {
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Nullable
        @Override
        protected String getJSBundleFile() {        //如果返回null，表示使用apk的assets中的bundle，否则使用返回的bundle
            String jsBundlePath = BundleUtils.getBundlePath(MainApplication.this);     //返回js代码路径
            Log.i("MainApplication:", "jsBundlePath = " + jsBundlePath);
            return jsBundlePath;
        }

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new SvgPackage(),
                    new FastImageViewPackage(),
                    new MyDeviceInfoPackage(),     //
                    new RNDeviceInfo(),     //设备信息
                    new UMengPackage(),     //友盟
                    new RNFetchBlobPackage(),       //文件下载
                    new RNFSPackage(),      //文件管理
                    new RCTZipPackage(),        //zip解压
                    new BGLightPackage(),       //背景灯光设置
                    new RCTSplashScreenPackage(),    //register Module
                    new ApkUtilPackage(),            //应用安装
                    new DplusReactPackage(),
                    new WebModulPackage(),
                    new SQLitePluginPackage(),
                    new VolumnPackage(),
                    new GiveStarPackage(),
                    new AdStatePackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };


    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        UmInit();
    }
    //包名：com.read.yyxs
    //签名：68f5300224a0c41903f298a25d6555aa


    private void UmInit() {
        /**
         * 设置组件化的Log开关
         * 参数: boolean 默认为false，如需查看LOG设置为true
         */
        UMConfigure.setLogEnabled(false);
        /**
         * 设置日志加密
         * 参数：boolean 默认为false（不加密）
         */
        UMConfigure.setEncryptEnabled(false);
        /**
         * 初始化common库
         * 参数1:上下文，不能为空
         * 参数2:设备类型，UMConfigure.DEVICE_TYPE_PHONE为手机、UMConfigure.DEVICE_TYPE_BOX为盒子，默认为手机
         * 参数3:Push推送业务的secret
         */
        UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, "249ccb5cfc2843af5c3ae934d3b3e3e5");
        // Toast.makeText(MainApplication.this, "开始注册", Toast.LENGTH_LONG).show();
        Log.e("MainApplication", "开始注册");
        /**
         * 注册推送服务
         */
        PushAgent mPushAgent = PushAgent.getInstance(this);
        mPushAgent.setResourcePackageName("com.read.yyxs");
        // mPushAgent.setPushCheck(true);
//注册推送服务，每次调用register方法都会回调该接口
        mPushAgent.register(new IUmengRegisterCallback() {

            @Override
            public void onSuccess(String deviceToken) {
                //注册成功会返回device token
                Log.e("MainApplication", "注册成功：" + deviceToken);
                PushModule.deviceToken = deviceToken;
            }

            @Override
            public void onFailure(String s, String s1) {
                Log.e("MainApplication", "注册失败：" + s + " + " + s1);
            }
        });

        UmengNotificationClickHandler notificationClickHandler = new UmengNotificationClickHandler() {
            /**
             * 该方法只会在push发送自定义动作时回调，
             * @param context
             * @param msg
             */
            @Override
            public void dealWithCustomAction(Context context, UMessage msg) {
                //Toast.makeText(context, msg.custom, Toast.LENGTH_LONG).show();
                Log.e("MainApplication", msg.extra.toString());
                if (msg != null && msg.extra.size() > 0
                        && msg.extra.get("ACTION") != null
                        && (msg.extra.get("ACTION").equals("1")) || (msg.extra.get("ACTION").equals("2"))) {
                    PushModule.pushBean = msg.extra;        //这个静态变量将会被js端调用，把push自定义动作传达到js端
                    if (AppUtils.isAppOnForeground(context, context.getPackageName())) {  //如果应用在前台，那么说明js端可以直接处理回调，直接把push参数返回给js端即可
                        PushModule.callBackPush();
                    } else {  //如果在后台，那么js段可能不能直接接收到push结果，那么需要先把app启动
                        AppUtils.openApp(context, context.getPackageName());
                    }

                }
            }
        };
        mPushAgent.setNotificationClickHandler(notificationClickHandler);
    }
}
