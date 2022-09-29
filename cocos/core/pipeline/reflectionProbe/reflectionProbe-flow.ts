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
import { IRenderFlowInfo, RenderFlow } from '../render-flow';
import { ReflectionProbeStage } from './reflectionProbe-stage';
import { RenderFlowTag } from '../pipeline-serialization';
import { RenderPipeline } from '..';
import { Camera, CameraType } from '../../renderer/scene';
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
        for (let i = 0; i < probes.length; i++) {
            const probe = probes[i];
            if (probe.needRefresh) {
                this._renderStage(probe);
                const renderObjects = this._pipeline.pipelineSceneData.renderObjects;
                for (let i = 0; i < renderObjects.length; i++) {
                    ReflectionProbeManager.probeManager.selectProbe(renderObjects[i]);
                    ReflectionProbeManager.probeManager.bindingTexture(renderObjects[i]);
                }
                console.log(`render probe id = ${probe.getProbeId()}`);
                break;
            }
        }
    }

    public destroy () {
        super.destroy();
    }
    private _renderStage (probe:ReflectionProbe) {
        for (let i = 0; i < this._stages.length; i++) {
            const probeStage = this._stages[i] as ReflectionProbeStage;
            for (let faceIdx = 0; faceIdx < 6; faceIdx++) {
                //update camera dirction
                probe.updateCameraDir(faceIdx);
                const renderTexture = probe.bakedTextures[faceIdx];
                probe.setTargetTexture(renderTexture);
                probeStage.setUsageInfo(probe, renderTexture.window!.framebuffer);
                probeStage.render(probe.camera!);
            }
        }
    }
}
