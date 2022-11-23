//
// Created by 陆康 on 2022/7/14.
//

#include <android/asset_manager_jni.h>
#include <android/log.h>
#include <android/native_window_jni.h>
#include <android_native_app_glue.h>
#include <fcntl.h>
#include <jni.h>
#include <unistd.h>
#include <thread>
#include <vector>

#include "platform/android/FileUtils-android.h"
#include "platform/java/jni/JniHelper.h"
#include "platform/java/jni/glue/JniNativeGlue.h"

extern "C" {

    //NOLINTNEXTLINE
    JNIEXPORT void JNICALL Java_com_cocos_lib_CocosNativeInterface_restartEngine(JNIEnv *env, jobject obj) {
        JNI_NATIVE_GLUE()->restartEngine();
    }

    //NOLINTNEXTLINE
    JNIEXPORT void JNICALL Java_com_cocos_lib_CocosNativeInterface_onCreateNative(JNIEnv *env, jobject obj, jobject context,
                                                                           jobject assetMgr, jstring obbPath, jint sdkVersion) {
        if (JNI_NATIVE_GLUE()->isRunning()) {
            return;
        }
        JNI_NATIVE_GLUE()->setSdkVersion(sdkVersion);
        cc::JniHelper::init(env, context);
        JNI_NATIVE_GLUE()->setObbPath(cc::JniHelper::jstring2string(obbPath));
        JNI_NATIVE_GLUE()->setResourceManager(AAssetManager_fromJava(env, assetMgr));
        cc::FileUtilsAndroid::setassetmanager(AAssetManager_fromJava(env, assetMgr));
        JNI_NATIVE_GLUE()->start(0, nullptr);

        JNI_NATIVE_GLUE()->setEnvGetter(cc::JniHelper::getEnv);
        JNI_NATIVE_GLUE()->setActivityGetter(cc::JniHelper::getActivity);
    }

    //NOLINTNEXTLINE
    JNIEXPORT void JNICALL Java_com_cocos_lib_CocosNativeInterface_onLowMemoryNative(JNIEnv *env, jobject obj) {
        JNI_NATIVE_GLUE()->onLowMemory();
    }

    //NOLINTNEXTLINE
    JNIEXPORT void JNICALL Java_com_cocos_lib_CocosNativeInterface_onSurfaceCreatedNative(JNIEnv *env, jobject obj, jobject surface) {
        JNI_NATIVE_GLUE()->setWindowHandler(ANativeWindow_fromSurface(env, surface));
    }

    //NOLINTNEXTLINE
    JNIEXPORT void JNICALL Java_com_cocos_lib_CocosNativeInterface_onStartNative(JNIEnv *env, jobject obj) {
        JNI_NATIVE_GLUE()->onResume();
    }

    //NOLINTNEXTLINE
    JNIEXPORT void JNICALL Java_com_cocos_lib_CocosNativeInterface_onStopNative(JNIEnv *env, jobject obj) {
        JNI_NATIVE_GLUE()->onPause();
    }

    //NOLINTNEXTLINE
    JNIEXPORT void JNICALL Java_com_cocos_lib_CocosNativeInterface_onSurfaceDestroyNative(JNIEnv *env, jobject obj) {
        JNI_NATIVE_GLUE()->setWindowHandler(nullptr);
    }

}