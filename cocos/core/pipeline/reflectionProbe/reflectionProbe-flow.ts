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
import { Camera, CameraType } from '../../renderer/scene';
import { ccclass } from '../../data/decorators';
import { ReflectionProbeManager } from '../../reflectionProbeManager';
import { ReflectionProbe } from '../../renderer/scene/reflectionProbe';
import { RenderTexture } from '../..';

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
        priority: 0,
        tag: RenderFlowTag.SCENE,
        stages: [],
    };

    public initialize (info: IRenderFlowInfo): boolean {
        super.initialize(info);
        if (this._stages.length === 0) {
            const probeStage = new ReflectionProbeStage();
            probeStage.initialize(ReflectionProbeStage.initInfo);
            this._stages.push(probeStage);
        }
        return true;
    }

    public activate (pipeline: RenderPipeline) {
        super.activate(pipeline);
    }

    public render (camera: Camera) {
        if (camera.cameraType !== CameraType.REFLECTION_PROBE) return;

        const probes = ReflectionProbeManager.probeManager.getProbes();
        if (probes.length === 0) return;

        for (let i = 0; i < probes.length; i++) {
            const probe = probes[i];
            if (!probe.isFrameBufferInitFinished()) {
                this._initFrameBuffer(probe);
            }
            this._renderStage(probe);
        }
    }

    public destroy () {
        super.destroy();
    }
    private _renderStage (probe:ReflectionProbe) {
        for (let i = 0; i < this._stages.length; i++) {
            //render six face
            for (let n = 0; n < 6; n++) {
                //update camera dirction
                probe.updateCamera(n);
                const probeStage = this._stages[i] as ReflectionProbeStage;
                const frameBuffer = probe.framebuffer[n];
                probeStage.setUsageInfo(probe, frameBuffer);
                probeStage.render(probe.camera!);
            }
        }
    }
    private _initFrameBuffer (probe:ReflectionProbe) {
        const pipeline = this._pipeline as ForwardPipeline;
        const { device } = pipeline;
        const format = supportsR32FloatTexture(device) ? Format.R32F : Format.RGBA8;
        // create six framebuffer to construction cubemap
        for (let i = 0; i < 6; i++) {
            const colorAttachment = new ColorAttachment();
            colorAttachment.format = format;

            const depthStencilAttachment = new DepthStencilAttachment();
            depthStencilAttachment.format = Format.DEPTH_STENCIL;

            const renderPassInfo = new RenderPassInfo([colorAttachment], depthStencilAttachment);
            const probeRenderPass = device.createRenderPass(renderPassInfo);

            const renderTexture = device.createTexture(new TextureInfo(
                TextureType.TEX2D,
                TextureUsageBit.COLOR_ATTACHMENT | TextureUsageBit.SAMPLED,
                Format.RGBA8,
                probe.resolution,
                probe.resolution,
            ));

            const framebuffer = device.createFramebuffer(new FramebufferInfo(
                probeRenderPass,
                [renderTexture],
            ));
            probe.framebuffer.push(framebuffer);
        }
    }
}
