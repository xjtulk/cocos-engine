// clang-format off

/* ----------------------------------------------------------------------------
 * This file was automatically generated by SWIG (https://www.swig.org).
 * Version 4.1.0
 *
 * Do not make changes to this file unless you know what you are doing - modify
 * the SWIG interface file instead.
 * ----------------------------------------------------------------------------- */

/****************************************************************************
 Copyright (c) 2022 Xiamen Yaji Software Co., Ltd.

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
#include "bindings/jswrapper/SeApi.h"
#include "bindings/manual/jsb_conversions.h"
#include "core/assets/Asset.h"
#include "core/assets/BufferAsset.h"
#include "core/assets/EffectAsset.h"
#include "core/assets/ImageAsset.h"
#include "core/assets/Material.h"
#include "core/builtin/BuiltinResMgr.h"
#include "3d/assets/Morph.h"
#include "3d/assets/Mesh.h"
#include "3d/assets/Skeleton.h"
#include "3d/misc/CreateMesh.h"



bool register_all_assets(se::Object* obj);


JSB_REGISTER_OBJECT_TYPE(cc::Error);
extern se::Object *__jsb_cc_Error_proto; // NOLINT
extern se::Class * __jsb_cc_Error_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Error * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::BoundingBox);
extern se::Object *__jsb_cc_BoundingBox_proto; // NOLINT
extern se::Class * __jsb_cc_BoundingBox_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::BoundingBox * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::VertexIdChannel);
extern se::Object *__jsb_cc_VertexIdChannel_proto; // NOLINT
extern se::Class * __jsb_cc_VertexIdChannel_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::VertexIdChannel * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::NativeDep);
extern se::Object *__jsb_cc_NativeDep_proto; // NOLINT
extern se::Class * __jsb_cc_NativeDep_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::NativeDep * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IGeometryOptions);
extern se::Object *__jsb_cc_IGeometryOptions_proto; // NOLINT
extern se::Class * __jsb_cc_IGeometryOptions_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IGeometryOptions * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::CustomAttribute);
extern se::Object *__jsb_cc_CustomAttribute_proto; // NOLINT
extern se::Class * __jsb_cc_CustomAttribute_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::CustomAttribute * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IGeometry);
extern se::Object *__jsb_cc_IGeometry_proto; // NOLINT
extern se::Class * __jsb_cc_IGeometry_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IGeometry * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::DynamicCustomAttribute);
extern se::Object *__jsb_cc_DynamicCustomAttribute_proto; // NOLINT
extern se::Class * __jsb_cc_DynamicCustomAttribute_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::DynamicCustomAttribute * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IDynamicGeometry);
extern se::Object *__jsb_cc_IDynamicGeometry_proto; // NOLINT
extern se::Class * __jsb_cc_IDynamicGeometry_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IDynamicGeometry * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Asset);
extern se::Object *__jsb_cc_Asset_proto; // NOLINT
extern se::Class * __jsb_cc_Asset_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::TextureBase);
extern se::Object *__jsb_cc_TextureBase_proto; // NOLINT
extern se::Class * __jsb_cc_TextureBase_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::SimpleTexture);
extern se::Object *__jsb_cc_SimpleTexture_proto; // NOLINT
extern se::Class * __jsb_cc_SimpleTexture_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::ITexture2DSerializeData);
extern se::Object *__jsb_cc_ITexture2DSerializeData_proto; // NOLINT
extern se::Class * __jsb_cc_ITexture2DSerializeData_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ITexture2DSerializeData * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ITexture2DCreateInfo);
extern se::Object *__jsb_cc_ITexture2DCreateInfo_proto; // NOLINT
extern se::Class * __jsb_cc_ITexture2DCreateInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ITexture2DCreateInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Texture2D);
extern se::Object *__jsb_cc_Texture2D_proto; // NOLINT
extern se::Class * __jsb_cc_Texture2D_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::ITextureCubeMipmap);
extern se::Object *__jsb_cc_ITextureCubeMipmap_proto; // NOLINT
extern se::Class * __jsb_cc_ITextureCubeMipmap_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ITextureCubeMipmap * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ITextureCubeSerializeMipmapData);
extern se::Object *__jsb_cc_ITextureCubeSerializeMipmapData_proto; // NOLINT
extern se::Class * __jsb_cc_ITextureCubeSerializeMipmapData_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ITextureCubeSerializeMipmapData * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::MipmapAtlasLayoutInfo);
extern se::Object *__jsb_cc_MipmapAtlasLayoutInfo_proto; // NOLINT
extern se::Class * __jsb_cc_MipmapAtlasLayoutInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::MipmapAtlasLayoutInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::TextureCubeMipmapAtlasInfo);
extern se::Object *__jsb_cc_TextureCubeMipmapAtlasInfo_proto; // NOLINT
extern se::Class * __jsb_cc_TextureCubeMipmapAtlasInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::TextureCubeMipmapAtlasInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::TextureCubeSerializeData);
extern se::Object *__jsb_cc_TextureCubeSerializeData_proto; // NOLINT
extern se::Class * __jsb_cc_TextureCubeSerializeData_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::TextureCubeSerializeData * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::TextureCube);
extern se::Object *__jsb_cc_TextureCube_proto; // NOLINT
extern se::Class * __jsb_cc_TextureCube_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::IRenderTextureCreateInfo);
extern se::Object *__jsb_cc_IRenderTextureCreateInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IRenderTextureCreateInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IRenderTextureCreateInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::RenderTexture);
extern se::Object *__jsb_cc_RenderTexture_proto; // NOLINT
extern se::Class * __jsb_cc_RenderTexture_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::BufferAsset);
extern se::Object *__jsb_cc_BufferAsset_proto; // NOLINT
extern se::Class * __jsb_cc_BufferAsset_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::IPropertyInfo);
extern se::Object *__jsb_cc_IPropertyInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IPropertyInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IPropertyInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::RasterizerStateInfo);
extern se::Object *__jsb_cc_RasterizerStateInfo_proto; // NOLINT
extern se::Class * __jsb_cc_RasterizerStateInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::RasterizerStateInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::DepthStencilStateInfo);
extern se::Object *__jsb_cc_DepthStencilStateInfo_proto; // NOLINT
extern se::Class * __jsb_cc_DepthStencilStateInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::DepthStencilStateInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::BlendTargetInfo);
extern se::Object *__jsb_cc_BlendTargetInfo_proto; // NOLINT
extern se::Class * __jsb_cc_BlendTargetInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::BlendTargetInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::BlendStateInfo);
extern se::Object *__jsb_cc_BlendStateInfo_proto; // NOLINT
extern se::Class * __jsb_cc_BlendStateInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::BlendStateInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IPassStates);
extern se::Object *__jsb_cc_IPassStates_proto; // NOLINT
extern se::Class * __jsb_cc_IPassStates_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IPassStates * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IPassInfoFull);
extern se::Object *__jsb_cc_IPassInfoFull_proto; // NOLINT
extern se::Class * __jsb_cc_IPassInfoFull_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IPassInfoFull * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ITechniqueInfo);
extern se::Object *__jsb_cc_ITechniqueInfo_proto; // NOLINT
extern se::Class * __jsb_cc_ITechniqueInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ITechniqueInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IBlockInfo);
extern se::Object *__jsb_cc_IBlockInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IBlockInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IBlockInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ISamplerTextureInfo);
extern se::Object *__jsb_cc_ISamplerTextureInfo_proto; // NOLINT
extern se::Class * __jsb_cc_ISamplerTextureInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ISamplerTextureInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ITextureInfo);
extern se::Object *__jsb_cc_ITextureInfo_proto; // NOLINT
extern se::Class * __jsb_cc_ITextureInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ITextureInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ISamplerInfo);
extern se::Object *__jsb_cc_ISamplerInfo_proto; // NOLINT
extern se::Class * __jsb_cc_ISamplerInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ISamplerInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IBufferInfo);
extern se::Object *__jsb_cc_IBufferInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IBufferInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IBufferInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IImageInfo);
extern se::Object *__jsb_cc_IImageInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IImageInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IImageInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IInputAttachmentInfo);
extern se::Object *__jsb_cc_IInputAttachmentInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IInputAttachmentInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IInputAttachmentInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IAttributeInfo);
extern se::Object *__jsb_cc_IAttributeInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IAttributeInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IAttributeInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IDefineInfo);
extern se::Object *__jsb_cc_IDefineInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IDefineInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IDefineInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IBuiltin);
extern se::Object *__jsb_cc_IBuiltin_proto; // NOLINT
extern se::Class * __jsb_cc_IBuiltin_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IBuiltin * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IBuiltinInfo);
extern se::Object *__jsb_cc_IBuiltinInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IBuiltinInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IBuiltinInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IBuiltins);
extern se::Object *__jsb_cc_IBuiltins_proto; // NOLINT
extern se::Class * __jsb_cc_IBuiltins_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IBuiltins * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IShaderSource);
extern se::Object *__jsb_cc_IShaderSource_proto; // NOLINT
extern se::Class * __jsb_cc_IShaderSource_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IShaderSource * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IShaderInfo);
extern se::Object *__jsb_cc_IShaderInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IShaderInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IShaderInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::EffectAsset);
extern se::Object *__jsb_cc_EffectAsset_proto; // NOLINT
extern se::Class * __jsb_cc_EffectAsset_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::IMemoryImageSource);
extern se::Object *__jsb_cc_IMemoryImageSource_proto; // NOLINT
extern se::Class * __jsb_cc_IMemoryImageSource_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IMemoryImageSource * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ImageAsset);
extern se::Object *__jsb_cc_ImageAsset_proto; // NOLINT
extern se::Class * __jsb_cc_ImageAsset_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::SceneAsset);
extern se::Object *__jsb_cc_SceneAsset_proto; // NOLINT
extern se::Class * __jsb_cc_SceneAsset_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::TextAsset);
extern se::Object *__jsb_cc_TextAsset_proto; // NOLINT
extern se::Class * __jsb_cc_TextAsset_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::IMaterialInfo);
extern se::Object *__jsb_cc_IMaterialInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IMaterialInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IMaterialInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Material);
extern se::Object *__jsb_cc_Material_proto; // NOLINT
extern se::Class * __jsb_cc_Material_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::IGeometricInfo);
extern se::Object *__jsb_cc_IGeometricInfo_proto; // NOLINT
extern se::Class * __jsb_cc_IGeometricInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IGeometricInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::IFlatBuffer);
extern se::Object *__jsb_cc_IFlatBuffer_proto; // NOLINT
extern se::Class * __jsb_cc_IFlatBuffer_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IFlatBuffer * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::RenderingSubMesh);
extern se::Object *__jsb_cc_RenderingSubMesh_proto; // NOLINT
extern se::Class * __jsb_cc_RenderingSubMesh_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::BuiltinResMgr);
extern se::Object *__jsb_cc_BuiltinResMgr_proto; // NOLINT
extern se::Class * __jsb_cc_BuiltinResMgr_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::IMeshBufferView);
extern se::Object *__jsb_cc_IMeshBufferView_proto; // NOLINT
extern se::Class * __jsb_cc_IMeshBufferView_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::IMeshBufferView * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::MorphTarget);
extern se::Object *__jsb_cc_MorphTarget_proto; // NOLINT
extern se::Class * __jsb_cc_MorphTarget_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::MorphTarget * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::SubMeshMorph);
extern se::Object *__jsb_cc_SubMeshMorph_proto; // NOLINT
extern se::Class * __jsb_cc_SubMeshMorph_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::SubMeshMorph * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Morph);
extern se::Object *__jsb_cc_Morph_proto; // NOLINT
extern se::Class * __jsb_cc_Morph_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Morph * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::MorphRenderingInstance);
extern se::Object *__jsb_cc_MorphRenderingInstance_proto; // NOLINT
extern se::Class * __jsb_cc_MorphRenderingInstance_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::MorphRendering);
extern se::Object *__jsb_cc_MorphRendering_proto; // NOLINT
extern se::Class * __jsb_cc_MorphRendering_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::StdMorphRendering);
extern se::Object *__jsb_cc_StdMorphRendering_proto; // NOLINT
extern se::Class * __jsb_cc_StdMorphRendering_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::Mesh::IVertexBundle);
extern se::Object *__jsb_cc_Mesh_IVertexBundle_proto; // NOLINT
extern se::Class * __jsb_cc_Mesh_IVertexBundle_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Mesh::IVertexBundle * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Mesh::ISubMesh);
extern se::Object *__jsb_cc_Mesh_ISubMesh_proto; // NOLINT
extern se::Class * __jsb_cc_Mesh_ISubMesh_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Mesh::ISubMesh * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Mesh::IDynamicInfo);
extern se::Object *__jsb_cc_Mesh_IDynamicInfo_proto; // NOLINT
extern se::Class * __jsb_cc_Mesh_IDynamicInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Mesh::IDynamicInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Mesh::IDynamicStruct);
extern se::Object *__jsb_cc_Mesh_IDynamicStruct_proto; // NOLINT
extern se::Class * __jsb_cc_Mesh_IDynamicStruct_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Mesh::IDynamicStruct * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Mesh::IStruct);
extern se::Object *__jsb_cc_Mesh_IStruct_proto; // NOLINT
extern se::Class * __jsb_cc_Mesh_IStruct_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Mesh::IStruct * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Mesh::ICreateInfo);
extern se::Object *__jsb_cc_Mesh_ICreateInfo_proto; // NOLINT
extern se::Class * __jsb_cc_Mesh_ICreateInfo_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::Mesh::ICreateInfo * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::Mesh);
extern se::Object *__jsb_cc_Mesh_proto; // NOLINT
extern se::Class * __jsb_cc_Mesh_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::Skeleton);
extern se::Object *__jsb_cc_Skeleton_proto; // NOLINT
extern se::Class * __jsb_cc_Skeleton_class; // NOLINT


JSB_REGISTER_OBJECT_TYPE(cc::ICreateMeshOptions);
extern se::Object *__jsb_cc_ICreateMeshOptions_proto; // NOLINT
extern se::Class * __jsb_cc_ICreateMeshOptions_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ICreateMeshOptions * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::ICreateDynamicMeshOptions);
extern se::Object *__jsb_cc_ICreateDynamicMeshOptions_proto; // NOLINT
extern se::Class * __jsb_cc_ICreateDynamicMeshOptions_class; // NOLINT


template<>
bool sevalue_to_native(const se::Value &from, cc::ICreateDynamicMeshOptions * to, se::Object *ctx);


JSB_REGISTER_OBJECT_TYPE(cc::MeshUtils);
extern se::Object *__jsb_cc_MeshUtils_proto; // NOLINT
extern se::Class * __jsb_cc_MeshUtils_class; // NOLINT

// clang-format on
