#define PI 3.1415926536
#define TAU 2.*PI

uniform float uTime;
uniform int uFrame;
uniform vec2 uResolution;
uniform sampler2D uOriginal;
uniform sampler2D uTexture;
uniform sampler2D uNoise;
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

    float startTimeSeconds = 4.;
    float fade = clamp(uTime/startTimeSeconds, 0., 1.);

    // noise
    vec4 noiseTexture = texture2D(uNoise, st);

    // noise displacement
    float angle = TAU*(noiseTexture.x);
    float amt = .005;
    float x = cos(angle);
    float y = sin(angle);
    vec2 disp = mix(vec2(0.), amt*vec2(x, y), fade);

    // blend textures
    vec4 fbkTexture = texture2D(uTexture, st - disp);
    vec4 original = texture2D(uOriginal, st);
    vec4 color = mix(original, fbkTexture, .95);

    gl_FragColor = vec4(color.xyz, 1);
}