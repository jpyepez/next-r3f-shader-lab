#define PI 3.1415926536
#define TAU 2.*PI

uniform float uTime;
uniform int uFrame;
uniform vec2 uResolution;
uniform sampler2D uTexture;
varying vec2 vUv;

vec2 correctAspectRatio(vec2 uv) {
    uv -= 0.5;
    uv.x *= uResolution.x/uResolution.y;
    uv += 0.5;
    return uv;
}

void main() {
    vec2 st = vUv;

    // st = correctAspectRatio(st);

    vec4 textureInput = texture2D(uTexture, st);
    vec3 color = vec3(textureInput.xyz);

    gl_FragColor = vec4(color, 1);
}