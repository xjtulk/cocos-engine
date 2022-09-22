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
import { Camera } from './components';
import { ReflectionProbe } from './renderer/scene/reflectionProbe';

export class ReflectionProbeManager {
    public static probeManager: ReflectionProbeManager;

    private _probes: ReflectionProbe[] = [];
    public register (probe: ReflectionProbe) {
        this._probes.push(probe);
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

    public getProbeByCamera (camera: Camera | null) {
        for (let i = 0; i < this._probes.length; i++) {
            if (this._probes[i].camera === camera) {
                return this._probes[i];
            }
        }
        return null;
    }
}

ReflectionProbeManager.probeManager = new ReflectionProbeManager();
