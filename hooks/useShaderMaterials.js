import { shaderMaterial } from '@react-three/drei/'
import { extend } from '@react-three/fiber'

const isArray = (arg) => Array.isArray(arg) && arg.length > 0
const isObject = (arg) => typeof arg === 'object'

const extendMaterial = ({
    materialName,
    uniforms,
    vertexShader,
    fragShader,
}) => {
    const ShaderMaterial = shaderMaterial(uniforms, vertexShader, fragShader)
    extend({ [materialName]: ShaderMaterial })
}

const useShaderMaterials = (shaderMaterials) => {
    if (isArray(shaderMaterials)) {
        shaderMaterials.forEach((material) => {
            extendMaterial(material)
        })
    } else if (isObject(shaderMaterials)) {
        extendMaterial(shaderMaterials)
    }
}

export default useShaderMaterials
