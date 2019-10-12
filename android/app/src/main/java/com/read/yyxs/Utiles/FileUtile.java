package com.read.yyxs.Utiles;

import java.io.File;

/**
 * Created by bangwen.lei on 2017/12/28.
 */

public class FileUtile {
    //删除文件夹和文件夹里面的文件
    public static void deleteDir(final String pPath) {
        try {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    File dir = new File(pPath);
                    deleteDirWihtFile(dir);
                }
            }).start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void deleteDirWihtFile(File dir) {
        try {
            if (dir == null || !dir.exists()) {
                return;
            }
            if (dir.isFile()) {
                dir.delete(); // 删除所有文件
                return;
            }
            for (File file : dir.listFiles()) {
                if (file.isFile())
                    file.delete(); // 删除所有文件
                else if (file.isDirectory())
                    deleteDirWihtFile(file); // 递规的方式删除文件夹
            }
            dir.delete();// 删除目录本身
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
