package com.read.yyxs.NativeModul.DeviceInfo;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


/**
 * Created by bangwen.lei on 2018/1/9.
 */

public class MyDeviceInfo extends ReactContextBaseJavaModule {
    public MyDeviceInfo(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @Override
    public String getName() {
        return "MyDeviceInfo";
    }


    @ReactMethod
    public void getDeviceInfos(Callback successCallBack, Callback failCallBack) {
        try {
            String imsi = DeviceInfoUtils.getImsi(getReactApplicationContext());
            String wlanMac = DeviceInfoUtils.getWlanMac(getReactApplicationContext());
            String blMac = DeviceInfoUtils.getBlMac(getReactApplicationContext());
            int isRooted = DeviceInfoUtils.isPhoneRooted();
            String androidId = DeviceInfoUtils.getAndroidId(getReactApplicationContext());
            String type = DeviceInfoUtils.getNetworkType(getReactApplicationContext());
            String simState = DeviceInfoUtils.getSimState(getReactApplicationContext());


            String deviceImsi = "";
            String deviceWlanMac = "";
            String deviceBlMac = "";
            int deviceIsRooted = 0;
            String deviceAndroidId = "";
            String deviceNetworkType = "";
            String deviceSimState = "";


            if (imsi != null) {
                deviceImsi = imsi;
            }
            if (wlanMac != null) {
                deviceWlanMac = wlanMac;
            }
            if (blMac != null) {
                deviceBlMac = blMac;
            }
            deviceIsRooted = isRooted;
            if (androidId != null) {
                deviceAndroidId = androidId;
            }
            if (type != null) {
                deviceNetworkType = type;
            }
            if (simState != null) {
                deviceSimState = simState;
            }
            successCallBack.invoke(1, deviceImsi, deviceWlanMac, deviceBlMac, deviceIsRooted, deviceAndroidId, deviceNetworkType, deviceSimState);
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取imsi异常");
            }
        }
    }


    @ReactMethod
    public void getImsi(Callback successCallBack, Callback failCallBack) {
        try {
            String imsi = DeviceInfoUtils.getImsi(getReactApplicationContext());
            if (imsi != null) {
                successCallBack.invoke(imsi);
            } else {
                failCallBack.invoke("获取imsi失败");
            }
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取imsi异常");
            }
        }
    }

    @ReactMethod
    public void getWlanMac(Callback successCallBack, Callback failCallBack) {
        try {
            String wlanMac = DeviceInfoUtils.getWlanMac(getReactApplicationContext());
            if (wlanMac != null) {
                successCallBack.invoke(wlanMac);
            } else {
                failCallBack.invoke("获取wlanMac失败");
            }
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取wlanMac异常");
            }
        }
    }


    @ReactMethod
    public void getBlMac(Callback successCallBack, Callback failCallBack) {
        try {
            String blMac = DeviceInfoUtils.getBlMac(getReactApplicationContext());
            if (blMac != null) {
                successCallBack.invoke(blMac);
            } else {
                failCallBack.invoke("获取blMac失败");
            }
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取blMac异常");
            }
        }
    }


    @ReactMethod
    public void getIsRooted(Callback successCallBack, Callback failCallBack) {
        try {
            int isRooted = DeviceInfoUtils.isPhoneRooted();
            successCallBack.invoke(isRooted);
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取isRooted异常");
            }
        }
    }

    @ReactMethod
    public void getAndroidId(Callback successCallBack, Callback failCallBack) {
        try {
            String androidId = DeviceInfoUtils.getAndroidId(getReactApplicationContext());
            if (androidId != null) {
                successCallBack.invoke(androidId);
            } else {
                failCallBack.invoke("获取androidId失败");
            }
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取androidId异常");
            }
        }
    }

    @ReactMethod
    public void getNetworkType(Callback successCallBack, Callback failCallBack) {
        try {
            String type = DeviceInfoUtils.getNetworkType(getReactApplicationContext());
            if (type != null) {
                successCallBack.invoke(type);
            } else {
                failCallBack.invoke("获取type失败");
            }
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取type异常");
            }
        }
    }


    @ReactMethod
    public void getSimState(Callback successCallBack, Callback failCallBack) {
        try {
            String simState = DeviceInfoUtils.getSimState(getReactApplicationContext());
            if (simState != null) {
                successCallBack.invoke(simState);
            } else {
                failCallBack.invoke("获取simState失败");
            }
        } catch (Exception e) {
            if (e != null) {
                failCallBack.invoke(e.toString());
            } else {
                failCallBack.invoke("获取simState异常");
            }
        }
    }
//    @ReactMethod
//    public void getDeviceInfo(Callback successCallBack, Callback failCallBack) {
//        try {
//            String type = DeviceInfoUtils.getNetworkType(getReactApplicationContext());
//            if (type != null) {
//                successCallBack.invoke(type);
//            } else {
//                failCallBack.invoke("获取type失败");
//            }
//        } catch (Exception e) {
//            if (e != null) {
//                failCallBack.invoke(e.toString());
//            } else {
//                failCallBack.invoke("获取type异常");
//            }
//        }
//    }
}
