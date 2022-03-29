import ShaderCanvas from 'components/ShaderScene/ShaderCanvas'
import React, { useContext, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { CanvasSetupContext } from 'store/canvasSetup/CanvasSetupProvider'
import setUniformTexture from 'utils/setUniformTexture'

const ShaderScene = React.forwardRef(
    ({ material, renderTarget, renderOutput, renderPriority = 0 }, ref) => {
        const { scene } = useThree()
        const { scale } = useContext(CanvasSetupContext)
        const sceneRef = useRef()

        useEffect(() => {
            scene.remove(sceneRef.current)
        }, [scene])

        useFrame(({ gl, camera }) => {
            gl.setRenderTarget(renderTarget)
            gl.render(sceneRef.current, camera)
            renderOutput &&
                setUniformTexture(
                    renderOutput.ref,
                    renderOutput.uniformName,
                    renderTarget.texture
                )
        }, renderPriority)

        return (
            <scene ref={sceneRef}>
                <ShaderCanvas ref={ref} scale={scale} material={material} />
            </scene>
        )
    }
)

ShaderScene.displayName = 'ShaderScene'

export default ShaderScene
