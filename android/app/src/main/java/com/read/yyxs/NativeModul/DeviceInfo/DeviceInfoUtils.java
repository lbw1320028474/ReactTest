package com.read.yyxs.NativeModul.DeviceInfo;

import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.net.wifi.WifiManager;
import android.os.IBinder;
import android.telephony.TelephonyManager;
import android.text.TextUtils;
import android.util.Log;

import java.io.File;
import java.lang.reflect.Method;

/**
 * Created by xuxiaolei on 2018/3/5.
 */

public class DeviceInfoUtils {
    public static String getImsi(Context context) {
        try {
            TelephonyManager mTelephonyMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            String imsi = mTelephonyMgr.getSubscriberId();
            Log.e("DeviceInfo", "imsi = " + imsi);
            return imsi;
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("DeviceInfo", e.toString());
            return null;
        }

    }

    public static String getWlanMac(Context context) {
        try {
            WifiManager wm = (WifiManager) context
                    .getSystemService(Context.WIFI_SERVICE);
            String wlanMac = wm.getConnectionInfo().getMacAddress();
            return wlanMac;
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("DeviceInfo", e.toString());
            return null;
        }
    }

    public static String getBlMac(Context context) {
        try {
            String blMac = BluetoothAdapter.getDefaultAdapter().getAddress();
            return blMac;
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("DeviceInfo", e.toString());
            return null;
        }
    }

    /**
     * 判断当前手机是否有ROOT权限
     *
     * @return
     */
    public static int isPhoneRooted() {
        int rooted = 0;
        try {
            if ((!new File("/system/bin/su").exists())
                    && (!new File("/system/xbin/su").exists())) {
                rooted = 0;
            } else {
                rooted = 1;
            }
        } catch (Exception e) {
        }
        return rooted;
    }

    public static String getAndroidId(Context context) {
        try {
            TelephonyManager mTelephonyMgr = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
            String androidId = mTelephonyMgr.getDeviceId();
            Log.e("DeviceInfo", "androidId = " + androidId);
            return androidId;
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("DeviceInfo", e.toString());
            return null;
        }
    }


    public static String getNetworkType(Context context) {
        try {
            TelephonyManager manager = (TelephonyManager) context
                    .getSystemService(Context.TELEPHONY_SERVICE);
            int networkType = manager.getNetworkType();
            Log.e("DeviceInfo", "networkType = " + networkType);
            return networkType + "";
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("DeviceInfo", e.toString());
            return null;
        }
    }

    public static String getSimState(Context context) {
        try {
            TelephonyManager manager = (TelephonyManager) context
                    .getSystemService(Context.TELEPHONY_SERVICE);
            int simState = manager.getSimState();
            Log.e("DeviceInfo", "simState = " + simState);
            return simState + "";
        } catch (Exception e) {
            e.printStackTrace();
            Log.e("DeviceInfo", e.toString());
            return null;
        }
    }
//
//    private static String getSubscriberId(int cardIndex) {
//        String name = null;
//        name = cardIndex == 1 ? "iphonesubinfo2" : "iphonesubinfo";
//        try {
//            Method method = Class.forName("android.os.ServiceManager")
//                    .getDeclaredMethod("getService",
//                            new Class[]{String.class});
//            method.setAccessible(true);
//            Object param = method.invoke(null, new Object[]{name});
//            if ((param == null) && (cardIndex == 1))
//                param = method.invoke(null, new Object[]{"iphonesubinfo1"});
//            if (param == null)
//                return null;
//            method = Class.forName(
//                    "com.android.internal.telephony.IPhoneSubInfo$Stub")
//                    .getDeclaredMethod("asInterface",
//                            new Class[]{IBinder.class});
//            method.setAccessible(true);
//            Object stubObj = method.invoke(null, new Object[]{param});
//            return (String) stubObj.getClass()
//                    .getMethod("getSubscriberId", new Class[0])
//                    .invoke(stubObj, new Object[0]);
//        } catch (Exception e) {
//            Log.w("DeviceInfo", "enter getSubscriberId error:", e);
//            return null;
//        }
//    }
//
//    private static String getMainCardIMSI(Context context) {
//        Log.i("DeviceInfo", "enter get MainCardIMSI");
//        if (context == null) {
//            Log.i("DeviceInfo", "MainCardIMSI err context = null");
//            return null;
//        }
////        String sdimsi = mIniReader.getValue("Device", "imsi");
////        if (sdimsi != null && sdimsi.length() == 15) {
////            PLog.i(tag, "获取sd卡 imsi = " + sdimsi);
////            return sdimsi;
////        }
//        String IMSI = null;
//        try {
//            boolean isDualMode = isDualMode();
//            if (isDualMode) {
//                int index = getMainCardIndex(context);
//
//                if (index != -1) {
//                    IMSI = getSubscriberId(index);
//                }
//            } else {
//                IMSI = getSubscriberId(0);
//                if (TextUtils.isEmpty(IMSI) || IMSI.length() != 15) {
//                    IMSI = getSubscriberId(1);
//                }
//            }
//        } catch (Exception e) {
//            Log.e("DeviceInfo", "get MainCardIMSI Exception : ", e);
//        }
//        if (TextUtils.isEmpty(IMSI) || IMSI.length() != 15) {
//            TelephonyManager telephonyManager = (TelephonyManager) context
//                    .getSystemService(Context.TELEPHONY_SERVICE);
//            IMSI = telephonyManager.getSubscriberId();
//        }
//        return IMSI;
//    }
//
//    private static boolean isDualMode() {
//        String imsi1 = getSubscriberId(0);
//        String imsi2 = getSubscriberId(1);
//        Log.i("DeviceInfo", "enter isDualMode imsi1 = " + imsi1 + " imsi2 = " + imsi2);
//        if (imsi1 != null && imsi2 != null) {
//            return true;
//        }
//        return false;
//    }
//
//    private static int getMTK(Context context) {
//        try {
//            TelephonyManager tm = (TelephonyManager) context
//                    .getSystemService(Context.TELEPHONY_SERVICE);
//            Method method = Class.forName("android.telephony.TelephonyManager")
//                    .getDeclaredMethod("getSmsDefaultSim", new Class[]{});
//            method.setAccessible(true);
//            Object index = method.invoke(tm, new Object[]{});
//            return (Integer) index;
//        } catch (Exception e) {
//            Log.i("DeviceInfo", "getMTK Exception = " + e);
//        }
//        return -1;
//    }
//
//    private static int getSPR(Context context) {
//        try {
//            TelephonyManager tm = (TelephonyManager) context
//                    .getSystemService(Context.TELEPHONY_SERVICE);
//            Method method = Class.forName("android.telephony.TelephonyManager")
//                    .getDeclaredMethod("getDefaultDataPhoneId", new Class[]{});
//            method.setAccessible(true);
//            Object index = method.invoke(tm, new Object[]{});
//            return (Integer) index;
//        } catch (Exception e) {
//            Log.i("DeviceInfo", "getSPR Exception = " + e);
//        }
//        return -1;
//    }
//
//    private static int getGaotong() {
//        try {
//            Method method = Class.forName("android.telephony.SmsManager")
//                    .getDeclaredMethod("getDefault", new Class[]{});
//            method.setAccessible(true);
//            Object param = method.invoke(null, new Object[]{});
//            method = Class.forName("android.telephony.SmsManager")
//                    .getDeclaredMethod("getPreferredSmsSubscription",
//                            new Class[]{});
//            method.setAccessible(true);
//            Object index = method.invoke(param, new Object[]{});
//            return (Integer) index;
//        } catch (Exception e) {
//            Log.i("DeviceInfo", "getGaotong Exception = " + e);
//        }
//        return -1;
//    }
//
//    private static int getMainCardIndex(Context context) {
//        Log.i("DeviceInfo", "enter getMainCardIndex");
//        int index = 0;
//        index = getMTK(context);
//        Log.i("DeviceInfo", "getMTK index = " + index);
//        if (index == -1) {
//            index = getSPR(context);
//            Log.i("DeviceInfo", "getSPR index = " + index);
//            if (index == -1) {
//                index = getGaotong();
//                Log.i("DeviceInfo", "getGaotong index = " + index);
//            }
//        }
//        if (index == 0 || index == 1) {
//            return index;
//        }
//        TelephonyManager telephonyManager = (TelephonyManager) context
//                .getSystemService(Context.TELEPHONY_SERVICE);
//        String IMSI = telephonyManager.getSubscriberId();
//        Log.i("DeviceInfo", "enter getMainCardIndex IMSI = " + IMSI);
//
//        if (IMSI != null && IMSI.equals(getSubscriberId(0))) {
//            return 0;
//        } else if (IMSI != null && IMSI.equals(getSubscriberId(1))) {
//            return 1;
//        }
//        return -1;
//    }

}
