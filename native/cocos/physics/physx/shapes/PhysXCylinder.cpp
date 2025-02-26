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

#include "physics/physx/shapes/PhysXCylinder.h"
#include <algorithm>
#include "math/Quaternion.h"
#include "physics/physx/PhysXUtils.h"
#include "physics/physx/PhysXWorld.h"
#include "physics/physx/shapes/PhysXShape.h"

namespace cc {
namespace physics {

PhysXCylinder::PhysXCylinder() : _mMesh(nullptr){};

void PhysXCylinder::setConvex(uint32_t objectID) {
    uintptr_t handle = PhysXWorld::getInstance().getPXPtrWithPXObjectID(objectID);
    if (handle == 0) return;
    if (reinterpret_cast<uintptr_t>(_mMesh) == handle) return;
    _mMesh = reinterpret_cast<physx::PxConvexMesh *>(handle);
    if (_mShape) {
        // TODO(Administrator): ...
    }
}

void PhysXCylinder::onComponentSet() {
    if (_mMesh) {
        physx::PxConvexMeshGeometry geom;
        geom.convexMesh = _mMesh;
        // geom.meshFlags = PxConvexMeshGeometryFlags::eTIGHT_BOUNDS;
        _mShape = PxGetPhysics().createShape(geom, getDefaultMaterial(), true);
        updateGeometry();
    }
}

void PhysXCylinder::setCylinder(float r, float h, EAxisDirection d) {
    _mData.radius = r;
    _mData.height = h;
    _mData.direction = d;
    updateGeometry();
}

void PhysXCylinder::updateGeometry() {
    if (!_mShape) return;
    static physx::PxMeshScale scale;
    auto *node = getSharedBody().getNode();
    node->updateWorldTransform();
    pxSetVec3Ext(scale.scale, node->getWorldScale());
    scale.scale.y *= std::max(0.0001F, _mData.height / 2);
    const auto radius = std::max(0.0001F, _mData.radius * 2);
    const auto xzMaxNorm = std::max(scale.scale.x, scale.scale.z);
    scale.scale.x = scale.scale.z = radius * xzMaxNorm;
    Quaternion quat;
    switch (_mData.direction) {
        case EAxisDirection::X_AXIS:
            quat.set(Vec3::UNIT_Z, physx::PxPiDivTwo);
            pxSetQuatExt(scale.rotation, quat);
            break;
        case EAxisDirection::Y_AXIS:
        default:
            scale.rotation = physx::PxQuat{physx::PxIdentity};
            break;
        case EAxisDirection::Z_AXIS:
            quat.set(Vec3::UNIT_X, physx::PxPiDivTwo);
            pxSetQuatExt(scale.rotation, quat);
            break;
    }
    physx::PxConvexMeshGeometry geom;
    if (getShape().getConvexMeshGeometry(geom)) {
        geom.scale = scale;
        getShape().setGeometry(geom);
    }
    pxSetQuatExt(_mRotation, quat);
}

void PhysXCylinder::updateScale() {
    updateGeometry();
    updateCenter();
}

} // namespace physics
} // namespace cc
