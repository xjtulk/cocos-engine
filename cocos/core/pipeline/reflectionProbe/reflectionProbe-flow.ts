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

import { supportsR32FloatTexture, UBOCamera, UBOCSM, UBOGlobal, UBOShadow } from '../define';
import { IRenderFlowInfo, RenderFlow } from '../render-flow';
import { ForwardFlowPriority } from '../enum';
import { ReflectionProbeStage } from './reflectionProbe-stage';
import { RenderPass, LoadOp, StoreOp,
    Format, Texture, TextureType, TextureUsageBit, ColorAttachment,
    DepthStencilAttachment, RenderPassInfo, TextureInfo, FramebufferInfo, Swapchain,
    Framebuffer, DescriptorSet, API, GeneralBarrierInfo, AccessFlagBit } from '../../gfx';
import { RenderFlowTag } from '../pipeline-serialization';
import { ForwardPipeline } from '../forward/forward-pipeline';
import { RenderPipeline } from '..';
import { Light } from '../../renderer/scene/light';
import { Camera } from '../../renderer/scene';
import { ccclass } from '../../data/decorators';
import { ReflectionProbeManager } from '../../reflectionProbeManager';
import { ReflectionProbe } from '../../renderer/scene/reflectionProbe';

/**
 * @en ReflectionProbe render flow
 * @zh 反射探针RenderTexture绘制流程
 */
@ccclass('ReflectionProbeFlow')
export class ReflectionProbeFlow extends RenderFlow {
    /**
     * @en A common initialization info for shadow map render flow
     * @zh 一个通用的 ShadowFlow 的初始化信息对象
     */
    public static initInfo: IRenderFlowInfo = {
        name: 'PIPELINE_FLOW_RELECTION_PROBE',
        priority: ForwardFlowPriority.SHADOW,
        tag: RenderFlowTag.SCENE,
        stages: [],
    };

    private _probeRenderPass: RenderPass | null = null;

    private _width = 512;
    private _height = 512;

    private _framebuffer: Framebuffer = null!;

    public initialize (info: IRenderFlowInfo): boolean {
        super.initialize(info);
        if (this._stages.length === 0) {
            const shadowMapStage = new ReflectionProbeStage();
            shadowMapStage.initialize(ReflectionProbeStage.initInfo);
            this._stages.push(shadowMapStage);
        }
        return true;
    }

    public activate (pipeline: RenderPipeline) {
        super.activate(pipeline);
        pipeline.onGlobalPipelineStateChanged();
    }

    public render (camera: Camera) {
        const pipeline = this._pipeline as ForwardPipeline;
        const globalDS = pipeline.descriptorSet;
        const reflectionProbes = ReflectionProbeManager.probeManager?.getReflectionProbes();
        if (reflectionProbes === undefined || reflectionProbes.length === 0) {
            return;
        }
        this._initFrameBuffer(pipeline);
        for (let i = 0; i < reflectionProbes.length; i++) {
            const probe = reflectionProbes[i];
            this._renderStage(probe, this._framebuffer, globalDS);
        }
    }

    public destroy () {
        super.destroy();
        if (this._probeRenderPass) { this._probeRenderPass.destroy(); }
    }
    private _renderStage (probe: ReflectionProbe, frameBuffer: Framebuffer, globalDS: DescriptorSet) {
        for (let i = 0; i < this._stages.length; i++) {
            const shadowStage = this._stages[i] as ReflectionProbeStage;
            shadowStage.setUsage(globalDS, frameBuffer);
            shadowStage.render(probe.camera!);
        }
    }
    public _initFrameBuffer  (pipeline: RenderPipeline) {
        const { device } = pipeline;

        // create renderPass
        const colorAttachment = new ColorAttachment();
        colorAttachment.format = Format.RGBA8;
        colorAttachment.loadOp = LoadOp.CLEAR;
        colorAttachment.storeOp = StoreOp.STORE;
        colorAttachment.barrier = device.getGeneralBarrier(new GeneralBarrierInfo(
            AccessFlagBit.NONE,
            AccessFlagBit.COLOR_ATTACHMENT_WRITE,
        ));
        this._probeRenderPass = device.createRenderPass(new RenderPassInfo([colorAttachment]));

        const curWidth = this._width;
        const curHeight = this._height;

        const renderTexture = device.createTexture(new TextureInfo(
            TextureType.TEX2D,
            TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED,
            Format.RGBA8,
            curWidth >> 1,
            curHeight >> 1,
        ));
        this._framebuffer = device.createFramebuffer(new FramebufferInfo(
            this._probeRenderPass,
            [renderTexture],
        ));
    }

    private clearShadowMap (validLights: Light[], camera: Camera) {
        const pipeline = this._pipeline;
        for (let i = 0; i < this._stages.length; i++) {
            const probeStage = this._stages[i] as ReflectionProbeStage;
            probeStage.clearFramebuffer(camera);
        }
    }

    private resizeShadowMap () {
        const pipeline = this._pipeline;
        const device = pipeline.device;
        const format = supportsR32FloatTexture(device) ? Format.R32F : Format.RGBA8;
    }
}
