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
import { CCBoolean, CCFloat, Color, Enum, Layers, Quat, Rect, ReflectionProbeManager, Root, TextureCube, toRadian, Vec3 } from '../..';
import { BoxCollider } from '../../../physics/framework/components/colliders/box-collider';
import { absolute } from '../../../physics/utils/util';
import { RenderTexture } from '../../assets/render-texture';
import { Component } from '../../components/component';
import { property } from '../../data/class-decorator';
import { ccclass, executeInEditMode, menu, playOnFocus, readOnly, serializable, tooltip, type, visible } from '../../data/decorators';
import { Director, director } from '../../director';
import { deviceManager } from '../../gfx';
import { BufferTextureCopy, ClearFlagBit, ColorAttachment, DepthStencilAttachment, Format, RenderPassInfo } from '../../gfx/base/define';
import { legacyCC } from '../../global-exports';
import { CAMERA_DEFAULT_MASK, IRenderObject } from '../../pipeline/define';
import { Camera, CameraAperture, CameraFOVAxis, CameraISO, CameraProjection, CameraShutter, CameraType, SKYBOX_FLAG, TrackingType } from './camera';

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
export const ProbeType = Enum({
    BAKE: 0,
    REALTIME: 1,
});
const cameraDir: Vec3[] = [
    new Vec3(0, -90, 0),
    new Vec3(0, 90, 0),
    new Vec3(90, 0, 0),
    new Vec3(-90, 0, 0),
    new Vec3(0, 0, 0),
    new Vec3(0, 180, 0),
];
enum ProbeFaceIndex {
    right = 0,
    left = 1,
    top = 2,
    bottom = 3,
    front = 4,
    back = 5,
}
@ccclass('cc.ReflectionProbe')
@menu('Rendering/ReflectionProbe')
@executeInEditMode
@playOnFocus
export class ReflectionProbe extends Component {
    @serializable
    protected _generate = true;

    @serializable
    protected _resolution = 512;
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

    @serializable
    protected _probeType = ProbeType.BAKE;

    @serializable
    protected _fov = 90;

    @serializable
    protected _cubeMap: TextureCube | null = null;

    @serializable
    protected _center = new Vec3(1, 1, 1);

    @serializable
    protected _size: Vec3 = new Vec3(1, 1, 1);

    // @property(Material)
    // material: Material | null = null;

    public static probeFaceIndex = ProbeFaceIndex;
    public static probeId = 0;

    public bakedTextures: RenderTexture[] = [];

    /**
     * @en objects in box range
     * @zh box范围内的物体
     */
    public renderObjects: IRenderObject[] = [];
    /**
     * @en Objects that use this probe
     * @zh 使用该probe的物体
     */
    public usedObjects: IRenderObject[] = [];

    private _camera: Camera | null = null;
    private _probeId = ReflectionProbe.probeId;

    private _originRotation = Quat.IDENTITY;
    private _needRefresh = false;

    @readOnly
    @type(CCBoolean)
    set generate (val) {
        this._generate = val;
        if (val) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.capture();
        }
    }
    get generate () {
        return this._generate;
    }

    /**
     * @en set probe type, bake or realtime
     * @zh 设置探针类型，烘焙或者运行时
     */
    @type(ProbeType)
    set probeType (value: number) {
        this._probeType = value;
    }
    get probeType () {
        return this._probeType;
    }

    /**
     * @en set render texture size
     * @zh 设置渲染纹理大小
     */
    @type(ProbeResolution)
    set resolution (value: number) {
        if (value !== this._resolution) {
            this.bakedTextures.forEach((rt, idx) => {
                rt.resize(value, value);
            });
        }
        this._resolution = value;
    }
    get resolution () {
        return this._resolution;
    }

    /**
     * @en Clearing flags of the camera, specifies which part of the framebuffer will be actually cleared every frame.
     * @zh 相机的缓冲清除标志位，指定帧缓冲的哪部分要每帧清除。
     */
    @type(ProbeClearFlag)
    set clearFlag (value: number) {
        this._clearFlag = value;
        this._camera!.clearFlag = this._clearFlag;
    }
    get clearFlag () {
        return this._clearFlag;
    }

    /**
     * @en Clearing color of the camera.
     * @zh 相机的颜色缓冲默认值。
     */
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

    /**
     * @en Field of view of the camera.
     * @zh 相机的视角大小。
     */
    @type(CCFloat)
    set fov (val) {
        this._fov = val;
        this._camera!.fov = toRadian(this._fov);
    }
    get fov () {
        return this._fov;
    }

    /**
     * @en Near clipping distance of the camera, should be as large as possible within acceptable range.
     * @zh 相机的近裁剪距离，应在可接受范围内尽量取最大。
     */
    @type(CCFloat)
    set near (val) {
        this._near = val;
        this._camera!.nearClip = this._near;
    }
    get near () {
        return this._near;
    }

    /**
     * @en Far clipping distance of the camera, should be as small as possible within acceptable range.
     * @zh 相机的远裁剪距离，应在可接受范围内尽量取最小。
     */
    @type(CCFloat)
    set far (val) {
        this._far = val;
        this._camera!.farClip = this._far;
    }
    get far () {
        return this._far;
    }

    /**
     * @en
     * Gets or sets the center of the collider, in local space.
     * @zh
     * 在本地空间中，获取box的中心点。
     */
    @type(Vec3)
    @property({ group: { name: 'Box' } })
    public set center (value: Vec3) {
        Vec3.copy(this._center, value);
        const collider = this.getComponent(BoxCollider);
        collider!.center = this._center;
    }
    public get center () {
        return this._center;
    }

    /**
     * @en
     * Gets or sets the size of the box, in local space.
     * @zh
     * 获取或设置盒的大小。
     */
    @type(Vec3)
    @property({ group: { name: 'Box' } })
    set size (value) {
        Vec3.copy(this._size, value);
        absolute(this._size);
        const collider = this.getComponent(BoxCollider);
        collider!.size = this._size;
    }
    get size () {
        return this._size;
    }

    get camera () {
        return this._camera;
    }
    get needRefresh () {
        return this._needRefresh;
    }

    get cubeMap () {
        return this._cubeMap;
    }

    public onLoad () {
        this._probeId = ReflectionProbe.probeId++;
        ReflectionProbeManager.probeManager.register(this);
        this._createCamera();
        this._originRotation = this.node.getRotation();
    }

    public onEnable () {
    }

    public start () {
        //wait for the scene data init
        if (this.bakedTextures.length === 0) {
            for (let i = 0; i < 6; i++) {
                const renderTexture = this._createTargetTexture();
                this.bakedTextures.push(renderTexture);
            }
            this.setTargetTexture(this.bakedTextures[0]);
        }
    }

    public onDestroy () {
        if (this._camera) {
            this._camera.destroy();
            this._camera = null;
        }
        for (let i = 0; i < this.bakedTextures.length; i++) {
            this.bakedTextures[i].destroy();
        }
        this.bakedTextures = [];
    }

    /* eslint-disable no-await-in-loop */
    /**
     * @en Render the six faces of the Probe and use the tool to generate a cubemap and save it to the asset directory.
     * @zh 渲染Probe的6个面，并且使用工具生成cubemap保存至asset目录。
     */
    public async capture () {
        await this.renderProbe();
        //Save rendertexture data to the resource directory
        const isHDR = (legacyCC.director.root as Root).pipeline.pipelineSceneData.isHDR;
        const caps = (legacyCC.director.root as Root).device.capabilities;
        const files: string[] = [];
        for (let faceIdx = 0; faceIdx < 6; faceIdx++) {
            const fileName = isHDR ? `capture_${faceIdx}.data` : `capture_${faceIdx}.png`;
            files.push(fileName);
            let pixelData = this.readPixels(this.bakedTextures[faceIdx]);
            if (caps.clipSpaceMinZ === -1) {
                pixelData = this.flipImage(pixelData, this._resolution, this._resolution);
            }
            if (isHDR) {
                await EditorExtends.Asset.saveHDRDataToImage(pixelData, this._resolution, this._resolution, fileName);
            } else {
                await EditorExtends.Asset.saveDataToImage(pixelData, this._resolution, this._resolution, fileName);
            }
        }
        //use the tool to generate a cubemap and save to asset directory
        await EditorExtends.Asset.bakeReflectionProbe(files, isHDR, this._probeId, (assert: any) => {
            this._cubeMap = assert;
        });
    }
    public async renderProbe () {
        this._attachCameraToScene();
        this._needRefresh = true;
        await this.waitForNextFrame();
        this._detachCameraFromScene();
        this._needRefresh = false;
        //reset rotation
        this.node.setRotation(this._originRotation);
    }

    private _createCamera () {
        const root = legacyCC.director.root as Root;
        if (!this._camera) {
            this._camera = (legacyCC.director.root as Root).createCamera();
            this._camera.initialize({
                name: this.node.name,
                node: this.node,
                projection: CameraProjection.PERSPECTIVE,
                window: EDITOR ? legacyCC.director.root && legacyCC.director.root.mainWindow
                    : legacyCC.director.root && legacyCC.director.root.tempWindow,
                priority: 0,
                cameraType: CameraType.REFLECTION_PROBE,
                trackingType: TrackingType.NO_TRACKING,
            });
        }
        this._camera.setViewportInOrientedSpace(new Rect(0, 0, 1, 1));
        this._camera.fovAxis = CameraFOVAxis.VERTICAL;
        this._camera.fov = toRadian(this._fov);
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
        return this._camera;
    }

    private _createTargetTexture () {
        const width = this._resolution;
        const height = this._resolution;
        const rt = new RenderTexture();
        const isHDR = (legacyCC.director.root as Root).pipeline.pipelineSceneData.isHDR;
        if (isHDR) {
            const colorAttachment = new ColorAttachment();
            colorAttachment.format = Format.RGBA32F;
            const depthStencilAttachment = new DepthStencilAttachment();
            depthStencilAttachment.format = Format.DEPTH_STENCIL;
            const passInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);
            rt.reset({ width, height, passInfo });
        } else {
            rt.reset({ width, height });
        }
        return rt;
    }

    public setTargetTexture (rt: RenderTexture) {
        if (!this._camera) {
            return;
        }
        if (rt) {
            const window = rt.window;
            this._camera.changeTargetWindow(window);
            this._camera.setFixedSize(window!.width, window!.height);
        }
    }

    private _attachCameraToScene () {
        if (!this.node.scene || !this._camera) {
            return;
        }
        const rs = this.node.scene.renderScene;
        rs!.addCamera(this._camera);
    }

    private _detachCameraFromScene () {
        if (this._camera && this._camera.scene) {
            this._camera.scene.removeCamera(this._camera);
        }
    }

    public getProbeId () {
        return this._probeId;
    }

    public readPixels (rt: RenderTexture): Uint8Array | Float32Array | null {
        const isHDR = (legacyCC.director.root as Root).pipeline.pipelineSceneData.isHDR;

        const width = rt.width;
        const height = rt.height;

        const needSize = 4 * width * height;
        let buffer: Uint8Array | Float32Array;
        if (isHDR) {
            buffer = new Float32Array(needSize);
        } else {
            buffer = new Uint8Array(needSize);
        }

        const gfxTexture = rt.getGFXTexture();
        if (!gfxTexture) {
            return null;
        }

        const gfxDevice = deviceManager.gfxDevice;

        const bufferViews: ArrayBufferView[] = [];
        const regions: BufferTextureCopy[] = [];

        const region0 = new BufferTextureCopy();
        region0.texOffset.x = 0;
        region0.texOffset.y = 0;
        region0.texExtent.width = rt.width;
        region0.texExtent.height = rt.height;
        regions.push(region0);

        bufferViews.push(buffer);
        gfxDevice?.copyTextureToBuffers(gfxTexture, bufferViews, regions);
        return buffer;
    }

    public flipImage (data: Uint8Array | Float32Array | null, width: number, height: number) {
        if (!data) {
            return null;
        }
        const isHDR = (legacyCC.director.root as Root).pipeline.pipelineSceneData.isHDR;
        let newData: Uint8Array | Float32Array;
        if (isHDR) {
            newData = new Float32Array(data.length);
        } else {
            newData = new Uint8Array(data.length);
        }
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

    public updateCameraDir (faceIdx: number) {
        this.node.setRotationFromEuler(cameraDir[faceIdx]);
        if (this._camera) {
            this._camera.update(true);
        }
    }

    public async waitForNextFrame () {
        return new Promise<void>((resolve, reject) => {
            director.once(Director.EVENT_END_FRAME, () => {
                resolve();
            });
        });
    }

    public isFinishedRendering () {
        return true;
    }
}