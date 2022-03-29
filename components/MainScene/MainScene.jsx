import MainCanvas from 'components/MainScene/MainCanvas'
import { sRGBEncoding, WebGLRenderTarget } from 'three'
import { useContext, useEffect, useRef } from 'react'
import { CanvasSetupContext } from 'store/canvasSetup/CanvasSetupProvider'
import ShaderScene from 'components/ShaderScene/ShaderScene'
import { Vector2 } from 'three'
import useShaderMaterials from 'hooks/useShaderMaterials'
import setUniformTexture from 'utils/setUniformTexture'
import blueCrystal from 'public/blueCrystal.jpg'
import { useTexture } from '@react-three/drei'
import getShaderMaterials from 'constants/shaderMaterials'
import { RepeatWrapping } from 'three'

const MainScene = () => {
    const { width, height } = useContext(CanvasSetupContext)
    const mainRef = useRef()
    const fbkRef = useRef()
    const noiseRef = useRef()

    const mainTarget = new WebGLRenderTarget(width, height)
    const fbkTarget = new WebGLRenderTarget(width, height)
    const noiseTarget = new WebGLRenderTarget(width, height)

    const shaderMaterials = getShaderMaterials(new Vector2(width, height))
    useShaderMaterials(shaderMaterials)

    // texture placeholder
    const crystal = useTexture(blueCrystal.src)
    crystal.encoding = sRGBEncoding
    crystal.wrapS = RepeatWrapping
    crystal.wrapT = RepeatWrapping

    useEffect(() => {
        setUniformTexture(fbkRef, 'uOriginal', crystal)
    }, [crystal])

    return (
        <>
            <MainCanvas textureMap={mainTarget.texture} />
            <ShaderScene
                ref={mainRef}
                renderTarget={mainTarget}
                renderOutput={{ ref: fbkRef, uniformName: 'uTexture' }}
                material={<mainMaterial />}
                renderPriority={3}
            />
            <ShaderScene
                ref={fbkRef}
                renderTarget={fbkTarget}
                renderOutput={{ ref: mainRef, uniformName: 'uTexture' }}
                material={<fbkMaterial />}
                renderPriority={2}
            />
            <ShaderScene
                ref={noiseRef}
                renderTarget={noiseTarget}
                renderOutput={{ ref: fbkRef, uniformName: 'uNoise' }}
                material={<noiseMaterial />}
                renderPriority={1}
            />
        </>
    )
}

export default MainScene
