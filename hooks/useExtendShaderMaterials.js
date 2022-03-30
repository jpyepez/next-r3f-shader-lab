import { shaderMaterial } from '@react-three/drei/'
import { extend } from '@react-three/fiber'
import shaderMaterials from 'constants/shaderMaterials'
import vertexShader from 'public/shaders/vertexShader.vert'

const isArray = (arg) => Array.isArray(arg) && arg.length > 0
const isObject = (arg) => typeof arg === 'object'

const extendMaterial = ({ materialName, uniforms, fragShader }) => {
    const ShaderMaterial = shaderMaterial(uniforms, vertexShader, fragShader)
    extend({ [materialName]: ShaderMaterial })
}

const useExtendShaderMaterials = (canvasResolution) => {
    if (isArray(shaderMaterials)) {
        shaderMaterials.forEach((material) => {
            material.uniforms.uResolution = canvasResolution
            extendMaterial(material)
        })
    } else if (isObject(shaderMaterials)) {
        shaderMaterials.uniforms.uResolution = canvasResolution
        extendMaterial(shaderMaterials)
    }
}

export default useExtendShaderMaterials
