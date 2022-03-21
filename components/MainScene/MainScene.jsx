import MainCanvas from 'components/MainScene/MainCanvas'
import { sRGBEncoding, WebGLRenderTarget } from 'three'
import { useContext, useEffect, useRef } from 'react'
import { CanvasSetupContext } from 'store/canvasSetup/CanvasSetupProvider'
import ShaderScene from 'components/ShaderScene/ShaderScene'
import fragShader from 'public/shaders/fragShader.frag'
import noiseShader from 'public/shaders/noiseShader.frag'
import fbkShader from 'public/shaders/fbkShader.frag'
import vertexShader from 'public/shaders/vertexShader.vert'
import { Vector2 } from 'three'
import useShaderMaterials from 'hooks/useShaderMaterials'
import setUniformTexture from 'utils/setUniformTexture'
import blueCrystal from 'public/blueCrystal.jpg'
import { useTexture } from '@react-three/drei'

// so far: already viewing shader from main canvas
// TODO: 1. make feedback work, 2. refactor into network
// TODO: find a good way to create a network (improve over renderOutput)

const MainScene = () => {
    const { width, height } = useContext(CanvasSetupContext)
    const mainRef = useRef()
    const fbkRef = useRef()

    const baseUniforms = {
        uTime: 0,
        uFrame: 0,
        uResolution: new Vector2(width, height),
    }

    useShaderMaterials([
        {
            materialName: 'NoiseMaterial',
            uniforms: { uTexture: { value: undefined }, ...baseUniforms },
            vertexShader,
            fragShader: noiseShader,
        },
        {
            materialName: 'FbkMaterial',
            uniforms: {
                uTexture: { value: undefined },
                uOriginal: { value: undefined },
                uNoise: { value: undefined },
                ...baseUniforms,
            },
            vertexShader,
            fragShader: fbkShader,
        },
        {
            materialName: 'MainMaterial',
            uniforms: { uTexture: { value: undefined }, ...baseUniforms },
            vertexShader,
            fragShader,
        },
    ])

    const mainTarget = new WebGLRenderTarget(width, height)
    const fbkTarget = new WebGLRenderTarget(width, height)
    const noiseTarget = new WebGLRenderTarget(width, height)

    // texture placeholder
    const crystal = useTexture(blueCrystal.src)
    crystal.encoding = sRGBEncoding

    // TODO: delete this when done
    useEffect(() => {
        setUniformTexture(mainRef, 'uTexture', crystal)
    }, [crystal])

    return (
        <>
            <MainCanvas textureMap={mainTarget.texture} />
            <ShaderScene
                renderTarget={noiseTarget}
                material={<noiseMaterial />}
            />
            {/* <ShaderScene renderTarget={target} material={<fbkMaterial />} /> */}
            <ShaderScene
                ref={mainRef}
                renderTarget={mainTarget}
                material={<mainMaterial />}
            />
        </>
    )
}

export default MainScene
