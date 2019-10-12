package com.read.yyxs.NativeModul.VolumKey;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.read.yyxs.NativeModul.Install.ApkUtil;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by xuxiaolei on 2018/4/29.
 */

public class VolumnPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new Volumn(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
