/****************************************************************************
 Copyright (c) 2021-2022 Xiamen Yaji Software Co., Ltd.

 http://www.cocos.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
****************************************************************************/

#ifndef XR_COMMON_H_
#define XR_COMMON_H_
#include <cstdint>
#include <functional>
#include <memory>
#include <string>
#include <vector>

namespace cc {
namespace xr {
#define XR_INTERFACE_RUNTIME_VERSION_1_0 1

enum class XREye {
    NONE = -1,
    LEFT = 0,
    RIGHT = 1,
    MONO = 2
};

enum class XRVendor {
    MONADO,
    META,
    HUAWEIVR,
    PICO,
    ROKID,
    SEED,
};

enum class XRConfigKey {
    MULTI_SAMPLES = 0,
    RENDER_SCALE = 1,
    SESSION_RUNNING = 2,
    INSTANCE_CREATED = 3,
    VK_QUEUE_FAMILY_INDEX = 4,
    METRICS_STATE = 5,
    VIEW_COUNT = 6,
    SWAPCHAIN_WIDTH = 7,
    SWAPCHAIN_HEIGHT = 8,
    SWAPCHAIN_FORMAT = 9,
    MULTITHREAD_MODE = 10,
    LOGIC_THREAD_ID = 11,
    RENDER_THREAD_ID = 12,
    DEVICE_VENDOR = 13,
    RUNTIME_VERSION = 14,
    PRESENT_ENABLE = 15,
    RENDER_EYE_FRAME_LEFT = 16,
    RENDER_EYE_FRAME_RIGHT = 17,
    FEATURE_PASSTHROUGH= 18,
    IMAGE_TRACKING = 19,
    IMAGE_TRACKING_CANDIDATEIMAGE = 20,
    IMAGE_TRACKING_DATA = 21,
    IMAGE_TRACKING_SUPPORT_STATUS = 22,
    HIT_TESTING = 23,
    HIT_TESTING_DATA = 24,
    HIT_TESTING_SUPPORT_STATUS = 25,
    PLANE_DETECTION = 26,
    PLANE_DETECTION_DATA = 27,
    PLANE_DETECTION_SUPPORT_STATUS = 28,
    SPATIAL_ANCHOR = 29,
    SPATIAL_ANCHOR_DATA = 30,
    SPATIAL_ANCHOR_SUPPORT_STATUS = 31,
    HAND_TRACKING = 32,
    HAND_TRACKING_DATA = 33,
    HAND_TRACKING_SUPPORT_STATUS = 34,
    MAX_COUNT
};

enum class XRConfigValueType {
    UNKNOWN,
    INT,
    FLOAT,
    BOOL,
    STRING,
    VOID_POINTER
};

struct XRConfigValue {
    int vInt = 0;
    float vFloat = 0;
    bool vBool = false;
    void *vPtr = nullptr;
    std::string vString;
    XRConfigValueType valueType = XRConfigValueType::UNKNOWN;
    bool isInt() {
        return valueType == XRConfigValueType::INT;
    }

    bool isFloat() {
        return valueType == XRConfigValueType::FLOAT;
    }

    bool isBool() {
        return valueType == XRConfigValueType::BOOL;
    }

    bool isPointer() {
        return valueType == XRConfigValueType::VOID_POINTER;
    }

    bool isString() {
        return valueType == XRConfigValueType::STRING;
    }

    bool getBool() {
        return vBool;
    }

    int getInt() {
        return vInt;
    }

    float getFloat() {
        return vFloat;
    }

    std::string getString() {
        return vString;
    }

    void *getPointer() {
        return vPtr;
    }

    XRConfigValue() {
    }

    XRConfigValue(int value) {
        valueType = XRConfigValueType::INT;
        vInt = value;
    }

    XRConfigValue(float value) {
        valueType = XRConfigValueType::FLOAT;
        vFloat = value;
    }

    XRConfigValue(std::string value) {
        valueType = XRConfigValueType::STRING;
        vString = value;
    }

    XRConfigValue(bool value) {
        valueType = XRConfigValueType::BOOL;
        vBool = value;
    }

    XRConfigValue(void *value) {
        valueType = XRConfigValueType::VOID_POINTER;
        vPtr = value;
    }
};

enum class XREventType {
    CLICK,
    STICK,
    GRAB,
    POSE,
    UNKNOWN
};

struct XRControllerInfo {
    virtual ~XRControllerInfo() = default;
    virtual XREventType getXREventType() const = 0;
};

struct XRClick : public XRControllerInfo {
    enum class Type {
        TRIGGER_LEFT,
        SHOULDER_LEFT,
        THUMBSTICK_LEFT,
        X,
        Y,
        MENU,
        TRIGGER_RIGHT,
        SHOULDER_RIGHT,
        THUMBSTICK_RIGHT,
        A,
        B,
        HOME,
        BACK,
        START,
        DPAD_UP,
        DPAD_DOWN,
        DPAD_LEFT,
        DPAD_RIGHT,
        UNKNOWN
    };

    bool isPress = false;
    Type type = Type::UNKNOWN;

    XRClick(Type type, bool isPress)
    : type(type),
      isPress(isPress) {}

    XREventType getXREventType() const override {
        return XREventType::CLICK;
    }
};

struct XRStick : public XRControllerInfo {
    enum class Type {
        STICK_LEFT,
        STICK_RIGHT,
        UNKNOWN
    };

    bool isActive = false;
    float x = 0.F;
    float y = 0.F;
    Type type = Type::UNKNOWN;

    XRStick(Type type, bool isActive)
    : type(type),
      isActive(isActive) {}

    XRStick(Type type, float x, float y)
    : type(type),
      isActive(true),
      x(x),
      y(y) {}

    XREventType getXREventType() const override {
        return XREventType::STICK;
    }
};

struct XRGrab : public XRControllerInfo {
    enum class Type {
        TRIGGER_LEFT,
        GRIP_LEFT,
        TRIGGER_RIGHT,
        GRIP_RIGHT,
        UNKNOWN
    };

    bool isActive = false;
    float value = 0.F;
    Type type = Type::UNKNOWN;

    XRGrab(Type type, bool isActive)
    : type(type),
      isActive(isActive) {}

    XRGrab(Type type, float value)
    : type(type),
      isActive(true),
      value(value) {}

    XREventType getXREventType() const override {
        return XREventType::GRAB;
    }
};

struct XRPose : public XRControllerInfo {
    enum class Type {
        VIEW_LEFT,
        HAND_LEFT,
        AIM_LEFT,
        VIEW_RIGHT,
        HAND_RIGHT,
        AIM_RIGHT,
        HEAD_MIDDLE,
        UNKNOWN
    };

    bool isActive = false;
    float px = 0.F;
    float py = 0.F;
    float pz = 0.F;
    float qx = 0.F;
    float qy = 0.F;
    float qz = 0.F;
    float qw = 1.F;
    Type type = Type::UNKNOWN;

    XRPose(Type type, bool isActive)
    : type(type),
      isActive(isActive) {}

    XRPose(Type type, float position[3], float quaternion[4])
    : type(type), isActive(true), px(position[0]), py(position[1]), pz(position[2]), qx(quaternion[0]), qy(quaternion[1]), qz(quaternion[2]), qw(quaternion[3]) {}

    XREventType getXREventType() const override {
        return XREventType::POSE;
    }
};

struct XRControllerEvent {
    std::vector<std::unique_ptr<XRControllerInfo>> xrControllerInfos;
};
typedef std::function<void(const XRControllerEvent &xrControllerEvent)> XRControllerCallback;
using PFNGLES3WLOADPROC = void *(*)(const char *);

typedef std::function<void(XRConfigKey, XRConfigValue)> XRConfigChangeCallback;

struct XRSwapchain {
    void *xrSwapchainHandle = nullptr;
    uint32_t width = 0;
    uint32_t height = 0;
    uint32_t glDrawFramebuffer = 0;
    uint32_t swapchainImageIndex = 0;
    uint32_t eye = 0;
};

struct XRTrackingImageData {
  std::string friendlyName;
  uint32_t id;
  uint8_t *buffer;
  uint32_t bufferSize;
  float physicalWidth;
  float physicalHeight;
  uint32_t pixelSizeWidth;
  uint32_t pixelSizeHeight;
  float posePosition[3];
  float poseQuaternion[4];
};

#define GraphicsApiOpenglES   "OpenGLES"
#define GraphicsApiVulkan_1_0 "Vulkan1"
#define GraphicsApiVulkan_1_1 "Vulkan2"

} // namespace xr
} // namespace cc
#endif // XR_COMMON_H_
