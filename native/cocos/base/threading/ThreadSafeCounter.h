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

#include <atomic>
#include <cstdint>

namespace cc {

template <typename T, typename = typename std::enable_if_t<std::is_integral<T>::value>>
class ThreadSafeCounter final {
public:
    inline T increment() noexcept { return add(1); }
    inline T add(T const v) noexcept { return _counter.fetch_add(v, std::memory_order_relaxed); }
    inline T decrement() noexcept { return subtract(1); }
    inline T subtract(T const v) noexcept { return _counter.fetch_sub(v, std::memory_order_relaxed); }
    inline void set(T const v) noexcept { _counter.store(v, std::memory_order_relaxed); }
    inline T get() const noexcept { return _counter.load(std::memory_order_relaxed); }
    inline void reset() noexcept { set(0); }

private:
    std::atomic<T> _counter{0};
};

} // namespace cc
