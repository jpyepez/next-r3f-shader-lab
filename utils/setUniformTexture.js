const setUniformTexture = (sceneRef, uniformName, texture) => {
    sceneRef.current.material.uniforms[uniformName].value = texture
}

export default setUniformTexture
