/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

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
 */
import { EDITOR } from 'internal:constants';
import { CCFloat, CCString, Color, Enum, Layers, Rect, Root, Texture2D, toRadian, Vec3 } from '../..';
import { RenderTexture } from '../../assets/render-texture';
import { ClearFlag } from '../../components/camera-component';
import { Component } from '../../components/component';
import { editable, executeInEditMode, help, menu, playOnFocus, serializable, tooltip, type, visible } from '../../data/decorators';
import { ccclass } from '../../data/decorators/ccclass';
import { Director, director } from '../../director';
import { ClearFlagBit } from '../../gfx/base/define';
import { legacyCC } from '../../global-exports';
import { CAMERA_DEFAULT_MASK } from '../../pipeline/define';
import { Camera, CameraAperture, CameraFOVAxis, CameraISO, CameraProjection, CameraShutter, CameraType, SKYBOX_FLAG, TrackingType } from './camera';

interface IProbeFace {
    front?: Texture2D;
    back?: Texture2D;
    left?: Texture2D;
    right?: Texture2D;
    top?: Texture2D;
    bottom?: Texture2D;
}
export const ProbeResolution = Enum({
    /**
     * @zh 分辨率 128 * 128。
     * @en renderTexture resolution 128 * 128.
     * @readonly
     */
    Low_128x128: 128,
    /**
     * @zh 分辨率 256 * 256。
     * @en renderTexture resolution 256 * 256.
     * @readonly
     */
    Low_256x256: 256,

    /**
      * @zh 分辨率 512 * 512。
      * @en renderTexture resolution 512 * 512.
      * @readonly
      */
    Medium_512x512: 512,

    /**
      * @zh 分辨率 1024 * 1024。
      * @en renderTexture resolution 1024 * 1024.
      * @readonly
      */
    High_1024x1024: 1024,

    /**
      * @zh 分辨率 2048 * 2048。
      * @en renderTexture resolution 2048 * 2048.
      * @readonly
      */
    Ultra_2048x2048: 2048,
});
export const ProbeClearFlag = Enum({
    SKYBOX: SKYBOX_FLAG | ClearFlagBit.DEPTH_STENCIL,
    SOLID_COLOR: ClearFlagBit.ALL,
});
@ccclass('cc.ReflectionProbe')
@help('i18n:cc.ReflectionProbe')
@menu('Mesh/ReflectionProbe')
@executeInEditMode
@playOnFocus
export class ReflectionProbe extends Component {
    // eslint-disable-next-line @typescript-eslint/ban-types
    private _camera: Camera | null = null;
    @serializable
    public _faces: IProbeFace = {};
    @serializable
    protected _generate = false;
    @serializable
    protected _fullPath = '';

    @serializable
    protected _size = 1024;
    @serializable
    protected _clearFlag = ProbeClearFlag.SKYBOX;

    @serializable
    protected _backgroundColor = new Color(0, 0, 0, 255);
    @serializable
    protected _visibility = CAMERA_DEFAULT_MASK;

    @serializable
    protected _near = 1;

    @serializable
    protected _far = 1000;

    //@readOnly
    @editable
    set generate (val) {
        console.log(val);
        this._generate = val;
        if (val) {
            this.startCapture();
        }
    }
    get generate () {
        return this._generate;
    }
    @type(CCString)
    set filePath (path: string) {
        this._fullPath = path;
    }
    get filePath () {
        return this._fullPath;
    }

    /**
     * @en set texture size
     * @zh 设置纹理大小
     */
    @type(ProbeResolution)
    set resolution (value: number) {
        this._size = value;
    }
    get resolution () {
        return this._size;
    }
    @type(ProbeClearFlag)
    set clearFlag (value: number) {
        this._clearFlag = value;
    }
    get clearFlag () {
        return this._clearFlag;
    }
    // eslint-disable-next-line func-names
    @visible(function (this: ReflectionProbe) { return this._clearFlag === ProbeClearFlag.SOLID_COLOR; })
    @type(Color)
    set backgroundColor (val: Color) {
        this._backgroundColor = val;
    }
    get backgroundColor () {
        return this._backgroundColor;
    }
    /**
     * @en Visibility mask, declaring a set of node layers that will be visible to this camera.
     * @zh 可见性掩码，声明在当前相机中可见的节点层级集合。
     */
    @type(Layers.BitMask)
    @tooltip('i18n:camera.visibility')
    get visibility () {
        return this._visibility;
    }

    set visibility (val) {
        this._visibility = val;
    }

    @type(CCFloat)
    set near (val) {
        this._near = val;
    }
    get near () {
        return this._near;
    }

    @type(CCFloat)
    set far (val) {
        this._far = val;
    }
    get far () {
        return this._far;
    }

    public startCapture () {
        const ccTest = this.getComponent('cc.Camera');
        console.log(ccTest.camera);
        const camera = this._createCamera();
        console.log(camera);
        const width = this._size;
        const height = this._size;
        const rt = new RenderTexture();
        rt.reset({ width, height });
        if (rt) {
            const window = rt.window;
            camera.changeTargetWindow(window);
            camera.setFixedSize(window!.width, window!.height);
        }
        director.once(Director.EVENT_END_FRAME, () => {
            let pixelData = rt.readPixels();
            pixelData = this.flipImageX(pixelData, width, height);
            EditorExtends.Asset.saveDataToImage(pixelData, width, height, this._fullPath, (params:any) => {
            });
            //callback(pixelData, width, height, pixelData);
        });
    }

    public startCaptureTest () {
        const camera = this.getComponent('cc.Camera');
        console.log(camera);
        const width = this._size;
        const height = this._size;
        const rt = new RenderTexture();
        rt.reset({ width, height });

        if (rt) {
            camera.targetTexture = rt;
        }
        director.once(Director.EVENT_END_FRAME, () => {
            const pixelData = rt.readPixels();
            EditorExtends.Asset.saveDataToImage(pixelData, width, height, this._fullPath, (params:any) => {
            });
            //callback(pixelData, width, height, pixelData);
        });
    }

    public _createCamera () {
        if (this._camera) {
            this._camera.destroy();
            this._camera = null;
        }
        if (!this._camera) {
            this._camera = (legacyCC.director.root as Root).createCamera();
            this._camera.initialize({
                name: this.node.name,
                node: this.node,
                projection: CameraProjection.PERSPECTIVE,
                window: legacyCC.director.root && legacyCC.director.root.mainWindow,
                priority: 0,
                cameraType: CameraType.DEFAULT,
                trackingType: TrackingType.NO_TRACKING,
            });
            this._camera.setViewportInOrientedSpace(new Rect(0, 0, 1, 1));
            this._camera.fovAxis = CameraFOVAxis.VERTICAL;
            this._camera.fov = toRadian(45);
            this._camera.orthoHeight = 10;
            this._camera.nearClip = this._near;
            this._camera.farClip = this._far;
            this._camera.clearColor = this._backgroundColor;
            this._camera.clearDepth = 1.0;
            this._camera.clearStencil = 0.0;
            this._camera.clearFlag = this._clearFlag;
            this._camera.visibility = this._visibility;
            this._camera.aperture = CameraAperture.F16_0;
            this._camera.shutter = CameraShutter.D125;
            this._camera.iso = CameraISO.ISO100;
        }
        this._camera.position = this.node.position;
        // this._camera.enabled = true;
        // this._camera.isWindowSize = true;
        // this._camera.forward = Vec3.FORWARD;
        this._attachToScene();
        return this._camera;
    }
    protected _attachToScene () {
        if (!this.node.scene || !this._camera) {
            return;
        }
        if (this._camera && this._camera.scene) {
            this._camera.scene.removeCamera(this._camera);
        }
        const rs = this._getRenderScene();
        rs.addCamera(this._camera);
    }
    public setTargetTexture (rt:RenderTexture) {
        this._updateTargetTexture(rt);

        if (!rt && this._camera) {
            this._camera.changeTargetWindow(EDITOR ? legacyCC.director.root.tempWindow : null);
            this._camera.isWindowSize = true;
        }
    }
    protected _updateTargetTexture (rt:RenderTexture) {
        if (!this._camera) {
            return;
        }
        if (rt) {
            const window = rt.window;
            this._camera.changeTargetWindow(window);
            this._camera.setFixedSize(window!.width, window!.height);
        }
    }
    public flipImageX (data:Uint8Array|null, width:number, height:number) {
        if (!data) {
            return null;
        }
        const newData = new Uint8Array(data.length);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const index = (width * i + j) * 4;
                const newIndex = (width * (height - i - 1) + j) * 4;
                newData[newIndex] = data[index];
                newData[newIndex + 1] = data[index + 1];
                newData[newIndex + 2] = data[index + 2];
                newData[newIndex + 3] = data[index + 3];
            }
        }
        return newData;
    }
}
