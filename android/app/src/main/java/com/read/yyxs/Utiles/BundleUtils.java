package com.read.yyxs.Utiles;

import android.content.Context;
import android.os.Environment;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import java.io.File;
import java.io.IOException;

/**
 * Created by bangwen.lei on 2017/12/28.
 */

public class BundleUtils {
    private static String jsBundleRootPath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/Bundle";

    public static String getBundlePath(Context context) {
        BundleUtils.jsBundleRootPath = context.getApplicationContext().getFilesDir().getAbsolutePath() + "/Bundle";
        Log.i("jsPath", BundleUtils.jsBundleRootPath);
        String bundlePath = "";
        try {
            BundleUtils.toDelete();
            String jsBundlePath = BundleUtils.jsBundleRootPath;
            if (TextUtils.isEmpty((jsBundlePath))) {
                Log.i("BundleUtils", "不存在Bundle目录");
                return null;
            } else {
                File jsBundleFile = new File(jsBundlePath);
                if (jsBundleFile == null || !jsBundleFile.exists()) {
                    jsBundleFile.mkdir();       //如果为空，预先创建好目录
                    Log.i("BundleUtils", "不存在Bundle目录,刚刚创建目录");
                    return null;
                }
                File[] files = jsBundleFile.listFiles();
                int sdcardBundleVersion = 0;
                if (files != null && files.length > 0) {
                    for (File f : files) {      //获取版本号最高的bundle
                        if (f.isDirectory()) {
                            try {
                                String fileName = f.getName();
                                String[] spileName = fileName.split("_");
                                if (spileName != null && spileName.length == 2 && spileName[0].equals("JSBundle")) {
                                    if (sdcardBundleVersion < Integer.parseInt(spileName[1])) {
                                        if (!TextUtils.isEmpty(bundlePath)) {
                                            try {       //不符合要求的文件直接删除
                                                FileUtile.deleteDir(bundlePath);
                                            } catch (Exception e) {
                                                e.printStackTrace();
                                            }
                                        }
                                        sdcardBundleVersion = Integer.parseInt(spileName[1]);
                                        bundlePath = f.getAbsolutePath();
                                    } else {
                                        try {
                                            FileUtile.deleteDir(f.getAbsolutePath());
                                        } catch (Exception e1) {
                                            e1.printStackTrace();
                                        }
                                    }
                                } else {
                                    try {
                                        FileUtile.deleteDir(f.getAbsolutePath());
                                    } catch (Exception e1) {
                                        e1.printStackTrace();
                                    }
                                }
                            } catch (Exception e) {     //异常文件直接删除
                                try {
                                    FileUtile.deleteDir(f.getAbsolutePath());
                                } catch (Exception e1) {
                                    e1.printStackTrace();
                                }
                            }
                        } else {
                            try {       //不符合要求的文件直接删除
                                // Toast.makeText(context, "删除" + f.getName(), 0).show();
                                FileUtile.deleteDir(f.getAbsolutePath());
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
                    if (sdcardBundleVersion <= 0) {
                        if (!TextUtils.isEmpty(bundlePath)) {
                            try {       //不符合要求的文件直接删除
                                FileUtile.deleteDir(bundlePath);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        Log.i("BundleUtils", "SD卡不存在js代码文件");
                        return null;
                    } else {
                        try {
                            String[] assetsFiles = new String[0];
                            assetsFiles = context.getResources().getAssets().list("Version");
                            int assetsBundleVersion = 0;
                            if (assetsFiles != null && assetsFiles.length > 0) {
                                for (String n : assetsFiles) {
                                    try {
                                        String[] nameSpile = n.split("_");
                                        if (nameSpile[0].equals("BundleVersion")) {
                                            if (Integer.parseInt(nameSpile[1]) > assetsBundleVersion) {
                                                assetsBundleVersion = Integer.parseInt(nameSpile[1]);
                                            }
                                        }
                                    } catch (Exception e) {

                                    }
                                }
                            }
                            if (assetsBundleVersion < sdcardBundleVersion) {
                                String bundleFilePath = bundlePath + "/index.android.bundle";
                                String metBundleFilePath = bundlePath + "/index.android.bundle.meta";
                                File bundleFile = new File(bundleFilePath);
                                File metBundlefile = new File(metBundleFilePath);
                                if (bundleFile != null && bundleFile.exists() && bundleFile.isFile() &&
                                        metBundlefile != null && metBundlefile.exists() && metBundlefile.isFile()) {
                                    return bundleFilePath;
                                } else {
                                    if (!TextUtils.isEmpty(bundlePath)) {
                                        try {       //不符合要求的文件直接删除
                                            FileUtile.deleteDir(bundlePath);
                                        } catch (Exception e) {
                                            e.printStackTrace();
                                        }
                                    }
                                    Log.i("BundleUtils", "SD卡不存在js代码文件1");
                                    return null;
                                }
                            } else {
                                if (!TextUtils.isEmpty(bundlePath)) {
                                    try {       //不符合要求的文件直接删除
                                        FileUtile.deleteDir(bundlePath);
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                }
                                Log.i("BundleUtils", "SD卡js代码版本号太低");
                                return null;
                            }
                        } catch (IOException e1) {
                            e1.printStackTrace();
                            if (!TextUtils.isEmpty(bundlePath)) {
                                try {       //不符合要求的文件直接删除
                                    FileUtile.deleteDir(bundlePath);
                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                            }
                            Log.i("BundleUtils", "读取异常" + e1.toString());
                            return null;
                        }
                    }
                } else {
                    if (!TextUtils.isEmpty(bundlePath)) {
                        try {       //不符合要求的文件直接删除
                            FileUtile.deleteDir(bundlePath);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                    Log.i("BundleUtils", "文件夹不存在333");
                    return null;
                }
            }
        } catch (Exception e) {
            if (!TextUtils.isEmpty(bundlePath)) {
                try {       //不符合要求的文件直接删除
                    FileUtile.deleteDir(bundlePath);
                } catch (Exception e1) {
                    e1.printStackTrace();
                }
            }
            Log.i("BundleUtils", "异常了" + e.toString());
            return null;
        }
    }

    private static void toDelete() {
        try {
            String apkPath = Environment.getExternalStorageDirectory().getAbsolutePath() + "/Bundle";
            File apkFile = new File(apkPath);
            if (apkFile != null && apkFile.isDirectory()) {
                File[] lists = apkFile.listFiles();
                if (lists != null && lists.length > 0) {
                    for (File f : lists) {
                        if (f.getName().endsWith(".apk")) {
                            FileUtile.deleteDirWihtFile(f);
                        }
                    }
                }
            }
        } catch (Exception e) {
            Log.e("BundleUtils", "" + e);
        }
    }
}
