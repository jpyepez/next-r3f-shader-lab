import { Canvas } from '@react-three/fiber'
import Head from 'next/head'
import { useContext } from 'react'
import { CanvasSetupContext } from 'store/canvasSetup/CanvasSetupProvider'
import ShaderScene from 'components/ShaderScene/ShaderScene'
import useShaderMaterial from 'hooks/useShaderMaterial'
import fragShader from 'public/shaders/fragShader.frag'
import vertexShader from 'public/shaders/vertexShader.vert'
import { Vector2 } from 'three'

export default function Home() {
    const { canvasWidth, canvasHeight, cameraZoom, canvasScale } =
        useContext(CanvasSetupContext)

    useShaderMaterial({
        materialName: 'ShaderMaterial',
        uniforms: {
            uTime: 0,
            uResolution: new Vector2(canvasWidth, canvasHeight),
        },
        vertexShader,
        fragShader,
    })

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1

    return (
        <main>
            <Head>
                <title>Next.js + R3F Shader Base</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Canvas
                style={{ width: canvasWidth, height: canvasHeight }}
                orthographic
                dpr={dpr}
                camera={{ position: [0, 0, 5], zoom: cameraZoom }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <ShaderScene scale={canvasScale} />
            </Canvas>
        </main>
    )
}
