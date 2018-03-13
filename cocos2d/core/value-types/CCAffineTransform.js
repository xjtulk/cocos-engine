/****************************************************************************
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

/**
 * !#en
 * cc.AffineTransform class represent an affine transform matrix. It's composed basically by translation, rotation, scale transformations.<br/>
 * Please do not use its constructor directly, use cc.affineTransformMake alias function instead.
 * !#zh
 * cc.AffineTransform 类代表一个仿射变换矩阵。它基本上是由平移旋转，缩放转变所组成。<br/>
 * 请不要直接使用它的构造，请使用 cc.affineTransformMake 函数代替。
 * @class AffineTransform
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @see cc.affineTransformMake
 */
cc.AffineTransform = function (a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
};

/**
 * !#en Create a cc.AffineTransform object with all contents in the matrix.
 * !#zh 用在矩阵中的所有内容创建一个 cc.AffineTransform 对象。
 * @method affineTransformMake
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 * @param {Number} tx
 * @param {Number} ty
 * @return {AffineTransform}
 */
cc.affineTransformMake = function (a, b, c, d, tx, ty) {
    return {a: a, b: b, c: c, d: d, tx: tx, ty: ty};
};

/**
 * !#en
 * Create a identity transformation matrix: <br/>
 * [ 1, 0, 0, <br/>
 *   0, 1, 0 ]
 * !#zh
 * 单位矩阵：<br/>
 * [ 1, 0, 0, <br/>
 *   0, 1, 0 ]
 *
 * @method affineTransformMakeIdentity
 * @return {AffineTransform}
 */
cc.affineTransformMakeIdentity = function () {
    return {a: 1.0, b: 0.0, c: 0.0, d: 1.0, tx: 0.0, ty: 0.0};
};

/**
 * !#en Clone a cc.AffineTransform object from the specified transform.
 * !#zh 克隆指定的 cc.AffineTransform 对象。
 * @method affineTransformClone
 * @param {AffineTransform} t
 * @return {AffineTransform}
 */
cc.affineTransformClone = function (t) {
    return {a: t.a, b: t.b, c: t.c, d: t.d, tx: t.tx, ty: t.ty};
};

/**
 * !#en Apply the affine transformation on a point.
 * !#zh 对一个点应用矩阵变换。
 * @method pointApplyAffineTransform
 * @param {Vec2|Number} point - or x.
 * @param {AffineTransform|Number} transOrY - transform matrix or y.
 * @param {AffineTransform} t - transform matrix or y.
 * @return {Vec2}
 */
cc.pointApplyAffineTransform = function (point, transOrY, t) {
    var x, y;
    if (t === undefined) {
        t = transOrY;
        x = point.x;
        y = point.y;
    } else {
        x = point;
        y = transOrY;
    }
    return {x: t.a * x + t.c * y + t.tx, y: t.b * x + t.d * y + t.ty};
};

cc._pointApplyAffineTransformOut = function (point, transOrY, transOrOut, out) {
    var x, y, t;
    if (out === undefined) {
        t = transOrY;
        x = point.x;
        y = point.y;
        out = transOrOut;
    } else {
        x = point;
        y = transOrY;
        t = transOrOut;
    }
    out.x = t.a * x + t.c * y + t.tx;
    out.y = t.b * x + t.d * y + t.ty;
};

/**
 * !#en Apply the affine transformation on a size.
 * !#zh 应用 Size 到仿射变换矩阵上。
 * @method sizeApplyAffineTransform
 * @param {Size} size
 * @param {AffineTransform} t
 * @return {Size}
 */
cc.sizeApplyAffineTransform = function (size, t) {
    return {width: t.a * size.width + t.c * size.height, height: t.b * size.width + t.d * size.height};
};

/**
 * !#en Apply the affine transformation on a rect.
 * !#zh 应用 Rect 到仿射变换矩阵上。
 * @method rectApplyAffineTransform
 * @param {Rect} rect
 * @param {AffineTransform} anAffineTransform
 * @return {Rect}
 */
cc.rectApplyAffineTransform = function (rect, t) {
    var ol = rect.x;
    var ob = rect.y;
    var or = ol + rect.width;
    var ot = ob + rect.height;
    var lbx = t.a * ol + t.c * ob + t.tx;
    var lby = t.b * ol + t.d * ob + t.ty;
    var rbx = t.a * or + t.c * ob + t.tx;
    var rby = t.b * or + t.d * ob + t.ty;
    var ltx = t.a * ol + t.c * ot + t.tx;
    var lty = t.b * ol + t.d * ot + t.ty;
    var rtx = t.a * or + t.c * ot + t.tx;
    var rty = t.b * or + t.d * ot + t.ty;

    var minX = Math.min(lbx, rbx, ltx, rtx);
    var maxX = Math.max(lbx, rbx, ltx, rtx);
    var minY = Math.min(lby, rby, lty, rty);
    var maxY = Math.max(lby, rby, lty, rty);
    return cc.rect(minX, minY, (maxX - minX), (maxY - minY));
};

function rectApplyMat4Out (rect, mat, out){
    var ol = rect.x;
    var ob = rect.y;
    var or = ol + rect.width;
    var ot = ob + rect.height;
    var lbx = mat.m00 * ol + mat.m04 * ob + mat.m12;
    var lby = mat.m01 * ol + mat.m05 * ob + mat.m13;
    var rbx = mat.m00 * or + mat.m04 * ob + mat.m12;
    var rby = mat.m01 * or + mat.m05 * ob + mat.m13;
    var ltx = mat.m00 * ol + mat.m04 * ot + mat.m12;
    var lty = mat.m01 * ol + mat.m05 * ot + mat.m13;
    var rtx = mat.m00 * or + mat.m04 * ot + mat.m12;
    var rty = mat.m01 * or + mat.m05 * ot + mat.m13;

    var minX = Math.min(lbx, rbx, ltx, rtx);
    var maxX = Math.max(lbx, rbx, ltx, rtx);
    var minY = Math.min(lby, rby, lty, rty);
    var maxY = Math.max(lby, rby, lty, rty);

    out.x = minX;
    out.y = minY;
    out.width = maxX - minX;
    out.height = maxY - minY;
    return out;
};

cc._rectApplyAffineTransformIn = function(rect, t){
    var ol = rect.x;
    var ob = rect.y;
    var or = ol + rect.width;
    var ot = ob + rect.height;
    var lbx = t.a * ol + t.c * ob + t.tx;
    var lby = t.b * ol + t.d * ob + t.ty;
    var rbx = t.a * or + t.c * ob + t.tx;
    var rby = t.b * or + t.d * ob + t.ty;
    var ltx = t.a * ol + t.c * ot + t.tx;
    var lty = t.b * ol + t.d * ot + t.ty;
    var rtx = t.a * or + t.c * ot + t.tx;
    var rty = t.b * or + t.d * ot + t.ty;

    var minX = Math.min(lbx, rbx, ltx, rtx);
    var maxX = Math.max(lbx, rbx, ltx, rtx);
    var minY = Math.min(lby, rby, lty, rty);
    var maxY = Math.max(lby, rby, lty, rty);

    rect.x = minX;
    rect.y = minY;
    rect.width = maxX - minX;
    rect.height = maxY - minY;
    return rect;
};

/**
 * !#en Apply the affine transformation on a rect, and truns to an Oriented Bounding Box.
 * !#zh 应用 Rect 到仿射变换矩阵上, 并转换为有向包围盒
 * @method obbApplyAffineTransform
 * @param {Rect} rect
 * @param {AffineTransform} anAffineTransform
 * @param {Vec2} out_bl
 * @param {Vec2} out_tl
 * @param {Vec2} out_tr
 * @param {Vec2} out_br
 */
cc.obbApplyAffineTransform = function (rect, anAffineTransform, out_bl, out_tl, out_tr, out_br) {
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;

    var tx = anAffineTransform.a * x + anAffineTransform.c * y + anAffineTransform.tx;
    var ty = anAffineTransform.b * x + anAffineTransform.d * y + anAffineTransform.ty;
    var xa = anAffineTransform.a * width;
    var xb = anAffineTransform.b * width;
    var yc = anAffineTransform.c * height;
    var yd = anAffineTransform.d * height;

    out_tl.x = tx;
    out_tl.y = ty;
    out_tr.x = xa + tx;
    out_tr.y = xb + ty;
    out_bl.x = yc + tx;
    out_bl.y = yd + ty;
    out_br.x = xa + yc + tx;
    out_br.y = xb + yd + ty;
};

cc.obbApplyMatrix = function (rect, mat4, out_bl, out_tl, out_tr, out_br) {
    var x = rect.x;
    var y = rect.y;
    var width = rect.width;
    var height = rect.height;

    var m00 = mat4.m00, m01 = mat4.m01, m04 = mat4.m04, m05 = mat4.m05;
    var m12 = mat4.m12, m13 = mat4.m13;

    var tx = m00 * x + m04 * y + m12;
    var ty = m01 * x + m05 * y + m13;
    var xa = m00 * width;
    var xb = m01 * width;
    var yc = m04 * height;
    var yd = m05 * height;

    out_tl.x = tx;
    out_tl.y = ty;
    out_tr.x = xa + tx;
    out_tr.y = xb + ty;
    out_bl.x = yc + tx;
    out_bl.y = yd + ty;
    out_br.x = xa + yc + tx;
    out_br.y = xb + yd + ty;
};

/**
 * !#en
 * Concatenate a transform matrix to another and return the result:<br/>
 * t' = t1 * t2
 * !#zh 拼接两个矩阵，并返回结果：<br/>
 * t' = t1 * t2
 *
 * @method affineTransformConcat
 * @param {AffineTransform} t1 - The first transform object.
 * @param {AffineTransform} t2 - The transform object to concatenate.
 * @return {AffineTransform} The result of concatenation.
 */
cc.affineTransformConcat = function (t1, t2) {
    return {a: t1.a * t2.a + t1.b * t2.c,                          //a
        b: t1.a * t2.b + t1.b * t2.d,                               //b
        c: t1.c * t2.a + t1.d * t2.c,                               //c
        d: t1.c * t2.b + t1.d * t2.d,                               //d
        tx: t1.tx * t2.a + t1.ty * t2.c + t2.tx,                    //tx
        ty: t1.tx * t2.b + t1.ty * t2.d + t2.ty};				    //ty
};

/**
 * !#en
 * Concatenate a transform matrix to another<br/>
 * The results are reflected in the first matrix.<br/>
 * t' = t1 * t2
 * !#zh
 * 拼接两个矩阵，将结果保存到第一个矩阵。<br/>
 * t' = t1 * t2
 * @method affineTransformConcatIn
 * @param {AffineTransform} t1 - The first transform object.
 * @param {AffineTransform} t2 - The transform object to concatenate.
 * @return {AffineTransform} The result of concatenation.
 */
cc.affineTransformConcatIn = function (t1, t2) {
    var a = t1.a, b = t1.b, c = t1.c, d = t1.d, tx = t1.tx, ty = t1.ty;
    t1.a = a * t2.a + b * t2.c;
    t1.b = a * t2.b + b * t2.d;
    t1.c = c * t2.a + d * t2.c;
    t1.d = c * t2.b + d * t2.d;
    t1.tx = tx * t2.a + ty * t2.c + t2.tx;
    t1.ty = tx * t2.b + ty * t2.d + t2.ty;
    return t1;
};

/**
 * !#en Get the invert transform of an AffineTransform object.
 * !#zh 求逆矩阵。
 * @method affineTransformInvert
 * @param {AffineTransform} t
 * @return {AffineTransform} The inverted transform object.
 */
cc.affineTransformInvert = function (t) {
    var determinant = 1 / (t.a * t.d - t.b * t.c);
    return {a: determinant * t.d, b: -determinant * t.b, c: -determinant * t.c, d: determinant * t.a,
        tx: determinant * (t.c * t.ty - t.d * t.tx), ty: determinant * (t.b * t.tx - t.a * t.ty)};
};

cc.affineTransformInvertIn = function (t) {
    var a = t.a, b = t.b, c = t.c, d = t.d;
    var determinant = 1 / (a * d - b * c);
    var tx = t.tx, ty = t.ty;
    t.a = determinant * d;
    t.b = -determinant * b;
    t.c = -determinant * c;
    t.d = determinant * a;
    t.tx = determinant * (c * ty - d * tx);
    t.ty = determinant * (b * tx - a * ty);
    return t;
};

/**
 * !#en Put the invert transform of an AffineTransform object into the out AffineTransform object.
 * !#zh 求逆矩阵并存入用户传入的矩阵对象参数。
 * @method affineTransformInvert
 * @param {AffineTransform} t
 * @param {AffineTransform} out
 */
cc.affineTransformInvertOut = function (t, out) {
    var a = t.a, b = t.b, c = t.c, d = t.d, tx = t.tx, ty = t.ty;
    var determinant = 1 / (a * d - b * c);
    out.a = determinant * d;
    out.b = -determinant * b;
    out.c = -determinant * c;
    out.d = determinant * a;
    out.tx = determinant * (c * ty - d * tx);
    out.ty = determinant * (b * tx - a * ty);
};

function affineTransformFromMatrixOut (mat, out) {
    out.a = mat.m00;
    out.b = mat.m01;
    out.c = mat.m04;
    out.d = mat.m05;
    out.tx = mat.m12;
    out.ty = mat.m13;
    return out;
};

module.exports = {
    make: cc.affineTransformMake,
    makeIdentity: cc.affineTransformMakeIdentity,
    fromMatrix: affineTransformFromMatrixOut,
    clone: cc.affineTransformClone,
    pointApply: cc._pointApplyAffineTransformOut,
    sizeApply: cc.sizeApplyAffineTransform,
    rectApplyIn: cc._rectApplyAffineTransformIn,
    rectApplyMat4: rectApplyMat4Out,
    concatIn: cc.affineTransformConcatIn,
    equal: cc.affineTransformEqualToTransform,
    invert: cc.affineTransformInvertOut,
};