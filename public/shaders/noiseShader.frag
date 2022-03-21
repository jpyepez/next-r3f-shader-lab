#pragma glslify: snoise = require(glsl-noise/simplex/3d) 
#pragma glslify: cnoise = require(glsl-noise/classic/3d) 

#define PI 3.1415926536
#define TAU 2.*PI

uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

vec2 correctAspectRatio(vec2 uv) {
    uv -= 0.5;
    uv.x *= uResolution.x/uResolution.y;
    uv += 0.5;
    return uv;
}

void main() {
    vec2 st = vUv;

    st = correctAspectRatio(st);

    float t = .25*uTime;
    float n_scale = 5.;
    float d = cnoise(vec3(n_scale*st, t));

	vec3 color = vec3(.5*(1.+d));

    gl_FragColor = vec4(color, 1);
}