/*
 Copyright (c) 2017-2020 Xiamen Yaji Software Co., Ltd.

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
import { MeshRenderer } from '../3d/framework/mesh-renderer';
import { Vec3 } from './math/vec3';
import { IRenderObject } from './pipeline/define';
import { Camera } from './renderer/scene/camera';
import { ReflectionProbe } from './renderer/scene/reflectionProbe';

export class ReflectionProbeManager {
    public static probeManager: ReflectionProbeManager;

    private _probes: ReflectionProbe[] = [];

    public register (probe: ReflectionProbe) {
        const index = this._probes.indexOf(probe);
        if (index === -1) {
            this._probes.push(probe);
        }
    }
    public unregister (probe: ReflectionProbe) {
        for (let i = 0; i < this._probes.length; i++) {
            if (this._probes[i] === probe) {
                this._probes.splice(i, 1);
                break;
            }
        }
    }
    public getProbes (): ReflectionProbe[] {
        return this._probes;
    }
    public clearAll () {
        this._probes = [];
    }
    public getProbeByCamera (camera:Camera) {
        for (let i = 0; i < this._probes.length; i++) {
            if (this._probes[i].camera === camera) {
                return this._probes[i];
            }
        }
        return null;
    }
    public addRenderObject (camera: Camera, obj: IRenderObject) {
        const probe = this.getProbeByCamera(camera);
        if (probe) {
            probe.renderObjects.push(obj);
        }
    }
    public clearRenderObject (camera: Camera) {
        const probe = this.getProbeByCamera(camera);
        if (probe) {
            probe.renderObjects = [];
        }
    }
    public getRenderObjects (camera: Camera) {
        const probe = this.getProbeByCamera(camera);
        if (probe) {
            return probe.renderObjects;
        }
        return [];
    }
    /**
     * @en
     * Choose which probe to use.
     * @zh
     * 选择使用的probe。
     */
    public selectProbe (object: IRenderObject) {
        if (object.model.transform === null) {
            return;
        }
        if (this._probes.length === 0) {
            return;
        }
        //select the nearest
        let distance = Vec3.distance(object.model.transform.position, this._probes[0].node.position);
        let idx = 0;
        for (let i = 1; i < this._probes.length; i++) {
            if (!this._probes[i].validate()) {
                continue;
            }
            const d = Vec3.distance(object.model.transform.position, this._probes[i].node.position);
            if (d < distance) {
                distance = d;
                idx = i;
            }
        }
        console.log(`use probe id = ${idx}`);
        const model = object.model;
        if (model.node !== null) {
            const meshRender = model.node.getComponent(MeshRenderer);
            meshRender?.materials.forEach((mat) => {
                this._probes[idx].usedMateria.push(mat!);
            });
        }
    }

    // public getUsedProbe (object: IRenderObject): ReflectionProbe | null {
    //     for (let i = 1; i < this._probes.length; i++) {
    //         const obj = this._probes[i].usedObjects.find((v) => v === object);
    //         if (obj) {
    //             return this._probes[i];
    //         }
    //     }
    //     return null;
    // }
}

ReflectionProbeManager.probeManager = new ReflectionProbeManager();
