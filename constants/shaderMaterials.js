import fragShader from 'public/shaders/fragShader.frag'
import noiseShader from 'public/shaders/noiseShader.frag'
import fbkShader from 'public/shaders/fbkShader.frag'

const baseUniforms = {
    uTime: 0,
    uFrame: 0,
    uResolution: null,
}

const shaderMaterials = [
    {
        materialName: 'MainMaterial',
        uniforms: { uTexture: { value: undefined }, ...baseUniforms },
        fragShader,
    },
    {
        materialName: 'FbkMaterial',
        uniforms: {
            uTexture: { value: undefined },
            uOriginal: { value: undefined },
            uNoise: { value: undefined },
            ...baseUniforms,
        },
        fragShader: fbkShader,
    },
    {
        materialName: 'NoiseMaterial',
        uniforms: { ...baseUniforms },
        fragShader: noiseShader,
    },
]

const getShaderMaterials = (canvasResolution) => {
    shaderMaterials.forEach((material) => {
        material.uniforms.uResolution = canvasResolution
    })
    return shaderMaterials
}

export default getShaderMaterials
