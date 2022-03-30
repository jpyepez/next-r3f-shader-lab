import { useEffect, useRef, useContext } from 'react'
import { CanvasSetupContext } from 'store/canvasSetup/CanvasSetupProvider'
import { WebGLRenderTarget } from 'three'
import setUniformTexture from 'utils/setUniformTexture'

const useInitShader = (material, inputs) => {
    const { width, height } = useContext(CanvasSetupContext)
    const ref = useRef()
    const renderTarget = new WebGLRenderTarget(width, height)

    useEffect(() => {
        inputs &&
            inputs.length > 0 &&
            inputs.forEach((input) => {
                setUniformTexture(ref, input.name, input.texture)
            })
    }, [inputs])

    return {
        ref,
        renderTarget,
        material,
        renderOutputs: null,
        setRenderOutputs(outputs) {
            this.renderOutputs = outputs
        },
    }
}

export default useInitShader
