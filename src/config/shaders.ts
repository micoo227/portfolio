export const vertexShader = /* glsl */ `
    uniform float sizeMultiplier;
    attribute float size;
    varying vec3 vColor;
    varying vec2 vUv;

    void main() {
        vColor = color;
        vUv = uv;
        gl_PointSize = size * sizeMultiplier;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

export const fragmentShader = /* glsl */ `
    uniform float opacity;
    uniform sampler2D spriteTexture;

    varying vec3 vColor;
    varying vec2 vUv;

    void main() {
        gl_FragColor = vec4( vColor.rgb, opacity );
        gl_FragColor = gl_FragColor * texture2D( spriteTexture, gl_PointCoord );
    }
`;

export const standardVertexShader = /* glsl */ `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fbmUtils = /* glsl */ `
    float hash(float p) {
        p = fract(p * 0.011);
        p *= p + 7.5;
        p *= p + p;
        return fract(p);
    }

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) *
            43758.5453123);
    }

    // Based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) +
            (c - a) * u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
    }

    float noise(vec3 x) {
        const vec3 step = vec3(110, 241, 171);

        vec3 i = floor(x);
        vec3 f = fract(x);

        float n = dot(i, step);

        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix( mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
                        mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
                    mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
                        mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
    }

    float fbm6(vec2 st) {
        float amplitude = 0.5;
        float value = 0.0;

        for (int i = 0; i < 6; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }

        return value;
    }

    float fbm6(vec3 st) {
        float amplitude = 0.5;
        float value = 0.0;

        for (int i = 0; i < 6; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
        }

        return value;
    }
`;

export const deepFogFragmentShader = /* glsl */ `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;

    ${fbmUtils}

    void main() {
        vec2 st = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;

        vec3 ro = vec3(uMouse.x * -0.3, uMouse.y * -0.3, -3.);
        vec3 lookat = vec3(0.);

        float zoom = 1.2;

        vec3 f = normalize(lookat - ro);
        vec3 r = normalize(cross(vec3(0., 1., 0.), f));
        vec3 u = normalize(cross(f, r));

        vec3 rd = normalize(r*st.x + u*st.y + f*zoom);

        vec3 q = vec3(fbm6(rd + vec3(0.0, 0.0, 0.0)),
                      fbm6(rd + vec3(10.2, 1.3, 2.3)),
                      fbm6(rd + vec3(4.3, 5.6, 1.0)));

        vec3 curlDistort = 0.1 * vec3(sin(rd.y * 1.0 + uTime),
                                      cos(rd.x * 1.0 - uTime),
                                      cos(rd.z * 0.1 - uTime));

        float f1 = fbm6(rd + curlDistort + 10.0 * q + vec3(0.1 * uTime, -0.1 * uTime, 0.05 * uTime));
        float f2 = fbm6(rd + curlDistort + 10.0 * q + vec3(-0.1 * uTime, 0.1 * uTime, -0.05 * uTime));
        float fbmResult = mix(f1, f2, 0.5);

        fbmResult *= 0.85;
        fbmResult = pow(fbmResult, 3.0);

        vec3 lightPos = vec3(-40., 20., 40.);
        float bgLightAmount = pow(max(dot(rd, normalize(lightPos - ro)), 0.), 2.0);
        bgLightAmount += (1.0 - bgLightAmount) * 0.15;

        vec3 bgLightColor = mix(vec3(.0, .0, .05), vec3(0.2, 0.9, 1.0), bgLightAmount);

        // Dithering to break up visual bands within the shading
        float ditheringNoise = random(st) * 0.005;
        bgLightColor += ditheringNoise;

        vec3 finalColor = bgLightColor;
        vec3 deepFog = bgLightColor * fbmResult;
        finalColor += deepFog;

        gl_FragColor = vec4(finalColor, 1.);
    }
`;

export const wispyFragmentShader = /* glsl */ `
    uniform float uTime;
    uniform vec2 uResolution;

    ${fbmUtils}

    void main() {
        vec2 st = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;

        vec2 q = vec2(fbm6(st),
                      fbm6(st + vec2(1.0, 1.0)));

        vec2 r = vec2(fbm6(st + q + vec2(1.7, 9.2) + 0.75*uTime),
                      fbm6(st + q + vec2(8.3, 2.8) + 0.625*uTime));

        float f = fbm6(st + r + q + vec2(0.5*uTime, -0.75*uTime));

        float alpha = f * 0.2;

        vec3 grayscaleColor = vec3(f*f*f);
        vec3 tint = vec3(0.2, 0.2, 0.2);
        vec3 finalColor = mix(grayscaleColor, tint, 0.2);
        
        gl_FragColor = vec4(finalColor, alpha);
    }
`;
