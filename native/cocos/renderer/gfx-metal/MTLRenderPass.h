/****************************************************************************
 Copyright (c) 2019-2022 Xiamen Yaji Software Co., Ltd.

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

#include "gfx-base/GFXRenderPass.h"

#import <Metal/MTLPixelFormat.h>
#import <Metal/MTLRenderPass.h>
#import <Metal/MTLTexture.h>
#include "math/Vec2.h"

namespace cc {
namespace gfx {

class CCMTLTexture;

class CCMTLRenderPass final : public RenderPass {
public:
    explicit CCMTLRenderPass();
    ~CCMTLRenderPass();

    void setColorAttachment(size_t slot, CCMTLTexture *texture, int level);
    void setDepthStencilAttachment(CCMTLTexture *texture, int level);

    inline MTLRenderPassDescriptor *getMTLRenderPassDescriptor() const { return _mtlRenderPassDescriptor; }
    inline uint32_t getColorRenderTargetNums() const { return _colorRenderTargetNums; }
    inline const ccstd::vector<Vec2> &getRenderTargetSizes() const { return _renderTargetSizes; }
    inline void nextSubpass() { _currentSubpassIndex++; }
    inline uint32_t getCurrentSubpassIndex() { return _currentSubpassIndex; }
    inline void reset() { _currentSubpassIndex = 0; }

protected:
    void doInit(const RenderPassInfo &info) override;
    void doDestroy() override;

    uint32_t _outputAttachmentOffset = 0;
    uint32_t _currentSubpassIndex = 0;
    MTLRenderPassDescriptor *_mtlRenderPassDescriptor = nil;
    uint32_t _colorRenderTargetNums = 0;
    ccstd::vector<Vec2> _renderTargetSizes;
};

} // namespace gfx
} // namespace cc
