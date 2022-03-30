import MainCanvas from 'components/MainScene/MainCanvas'
import { sRGBEncoding } from 'three'
import { useContext } from 'react'
import { CanvasSetupContext } from 'store/canvasSetup/CanvasSetupProvider'
import { Vector2 } from 'three'
import useExtendShaderMaterials from 'hooks/useExtendShaderMaterials'
import blueCrystal from 'public/blueCrystal.jpg'
import { useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'
import useInitShader from 'hooks/useInitShader'
import MainShaders from './MainShaders'

const MainScene = () => {
    const { width, height } = useContext(CanvasSetupContext)

    useExtendShaderMaterials(new Vector2(width, height))

    const crystal = useTexture(blueCrystal.src)
    crystal.encoding = sRGBEncoding
    crystal.wrapS = RepeatWrapping
    crystal.wrapT = RepeatWrapping

    const noise = useInitShader(<noiseMaterial />)
    const fbk = useInitShader(<fbkMaterial />, [
        { name: 'uOriginal', texture: crystal },
    ])
    const main = useInitShader(<mainMaterial />)

    noise.setRenderOutputs([{ ref: fbk.ref, uniformName: 'uNoise' }])
    fbk.setRenderOutputs([{ ref: main.ref, uniformName: 'uTexture' }])
    main.setRenderOutputs([{ ref: fbk.ref, uniformName: 'uTexture' }])

    const shaders = [noise, fbk, main]

    return (
        <>
            <MainCanvas textureMap={main.renderTarget.texture} />
            <MainShaders shaders={shaders} />
        </>
    )
}

export default MainScene
