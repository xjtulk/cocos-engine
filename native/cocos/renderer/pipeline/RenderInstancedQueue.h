/****************************************************************************
 Copyright (c) 2020-2022 Xiamen Yaji Software Co., Ltd.

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

#pragma once

#include "Define.h"
#include "base/Macros.h"
#include "base/TypeDef.h"
#include "base/std/container/set.h"
#include "base/std/container/vector.h"

namespace cc {

namespace gfx {
class Device;
class RenderPass;
class CommandBuffer;
class DescriptorSet;
} // namespace gfx

namespace pipeline {

class InstancedBuffer;

class CC_DLL RenderInstancedQueue final {
public:
    RenderInstancedQueue() = default;
    ~RenderInstancedQueue() = default;
    void recordCommandBuffer(gfx::Device *device, gfx::RenderPass *renderPass, gfx::CommandBuffer *cmdBuffer,
                             gfx::DescriptorSet *ds = nullptr, uint32_t offset = 0, const ccstd::vector<uint32_t> *dynamicOffsets = nullptr);
    void add(InstancedBuffer *instancedBuffer);
    void uploadBuffers(gfx::CommandBuffer *cmdBuffer);
    void sort();
    void clear();
    bool empty() { return _queues.empty(); }

private:
    // `InstancedBuffer *`: weak reference
    ccstd::set<InstancedBuffer *> _queues;
    ccstd::vector<InstancedBuffer *> _renderQueues;
};

} // namespace pipeline
} // namespace cc
