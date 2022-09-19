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

import { Color, Rect, Framebuffer, DescriptorSet } from '../../gfx';
import { IRenderStageInfo, RenderStage } from '../render-stage';
import { ForwardStagePriority } from '../enum';
import { ForwardPipeline } from '../forward/forward-pipeline';
import { SetIndex } from '../define';
import { ReflectionProbeFlow } from './reflectionProbe-flow';
import { Camera } from '../../renderer/scene';
import { ccclass } from '../../data/decorators';

const colors: Color[] = [new Color(1, 1, 1, 1)];

/**
 * @en Shadow map render stage
 * @zh 阴影渲染阶段。
 */
@ccclass('ReflectionProbeStage')
export class ReflectionProbeStage extends RenderStage {
    /**
     * @en A common initialization info for shadow map render stage
     * @zh 一个通用的 ShadowStage 的初始化信息对象
     */
    public static initInfo: IRenderStageInfo = {
        name: 'ReflectionProbeStage',
        priority: ForwardStagePriority.FORWARD,
        tag: 0,
    };

    /**
     * @en Sets the render shadow map info
     * @zh 设置阴影渲染信息
     * @param light
     * @param shadowFrameBuffer
     * @param level 层级
     */
    public setUsage (globalDS: DescriptorSet, frameBuffer:Framebuffer) {
        this._globalDS = globalDS;
        this._frameBuffer = frameBuffer;
    }

    private _frameBuffer: Framebuffer | null = null;
    private _renderArea = new Rect();
    private _globalDS: DescriptorSet | null = null;

    public destroy () {
        this._frameBuffer = null;
        this._globalDS = null;
    }

    public clearFramebuffer (camera: Camera) {
        if (!this._frameBuffer) { return; }

        colors[0].w = camera.clearColor.w;
        const pipeline = this._pipeline as ForwardPipeline;
        const pipelineSceneData = pipeline.pipelineSceneData;
        const shadingScale = pipelineSceneData.shadingScale;
        const shadowInfo = pipelineSceneData.shadows;
        const vp = camera.viewport;
        const shadowMapSize = shadowInfo.size;
        this._renderArea.x = vp.x * shadowMapSize.x;
        this._renderArea.y = vp.y * shadowMapSize.y;
        this._renderArea.width =  vp.width * shadowMapSize.x * shadingScale;
        this._renderArea.height = vp.height * shadowMapSize.y * shadingScale;
        const cmdBuff = pipeline.commandBuffers[0];
        const renderPass = this._frameBuffer.renderPass;

        cmdBuff.beginRenderPass(renderPass, this._frameBuffer, this._renderArea,
            colors, camera.clearDepth, camera.clearStencil);
        cmdBuff.endRenderPass();
    }

    public render (camera: Camera) {
        const pipeline = this._pipeline;
        const pipelineSceneData = pipeline.pipelineSceneData;
        const descriptorSet = this._globalDS!;
        const cmdBuff = pipeline.commandBuffers[0];

        this._renderArea.x = 0;
        this._renderArea.y = 0;
        this._renderArea.width = 512;
        this._renderArea.height = 512;

        const device = pipeline.device;
        const renderPass = this._frameBuffer!.renderPass;

        cmdBuff.beginRenderPass(renderPass, this._frameBuffer!, this._renderArea,
            colors, camera.clearDepth, camera.clearStencil);
        cmdBuff.bindDescriptorSet(SetIndex.GLOBAL, descriptorSet);

        cmdBuff.endRenderPass();
    }

    public activate (pipeline: ForwardPipeline, flow: ReflectionProbeFlow) {
        super.activate(pipeline, flow);
    }
}
