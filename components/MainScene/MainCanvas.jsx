import { useFrame, useThree } from '@react-three/fiber'
import { useContext } from 'react'
import { CanvasSetupContext } from 'store/canvasSetup/CanvasSetupProvider'

const MainCanvas = ({ textureMap, ...props }) => {
    const { scene } = useThree()
    const { scale } = useContext(CanvasSetupContext)

    useFrame(({ gl, camera }) => {
        gl.setRenderTarget(null)
        gl.render(scene, camera)
    }, 1000)

    return (
        <mesh {...props} scale={scale}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={textureMap} />
        </mesh>
    )
}

export default MainCanvas
