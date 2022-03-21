import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const ShaderCanvas = React.forwardRef(({ material, ...props }, ref) => {
    useFrame((_, delta) => {
        if (ref) {
            ref.current.material.uniforms.uTime.value += delta
            ref.current.material.uniforms.uFrame.value += 1
        }
    })

    return (
        <mesh ref={ref} {...props}>
            <planeGeometry args={[1, 1]} />
            {material}
        </mesh>
    )
})

ShaderCanvas.displayName = 'ShaderCanvas'

export default ShaderCanvas
