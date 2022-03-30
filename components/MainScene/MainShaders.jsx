import ShaderScene from 'components/ShaderScene/ShaderScene'

const MainShaders = ({ shaders }) =>
    shaders.map((shader, idx) => (
        <ShaderScene
            {...shader}
            renderPriority={idx + 1}
            key={`shader-scene-${idx}`}
        />
    ))

export default MainShaders
