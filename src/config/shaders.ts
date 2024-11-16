export const vertexShader = `
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

export const fragmentShader = `
    uniform float opacity;
    uniform sampler2D spriteTexture;

    varying vec3 vColor;
    varying vec2 vUv;

    void main() {
        gl_FragColor = vec4( vColor.rgb, opacity );
        gl_FragColor = gl_FragColor * texture2D( spriteTexture, gl_PointCoord );
    }
`;

export const standardVertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fbmUtils = `
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
`;

export const deepFogFragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;

    ${fbmUtils}

    void main() {
        vec2 st = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;

        vec2 q = vec2(fbm6(st + vec2(0.0, 0.0)),
                      fbm6(st + vec2(10.2, 1.3)));

        vec2 curlDistort = 0.1 * vec2(sin(st.y * 1.0 + uTime), cos(st.x * 1.0 - uTime));

        float f1 = fbm6(st + curlDistort + 10.0 * q + vec2(0.1 * uTime, -0.1 * uTime));
        float f2 = fbm6(st + curlDistort + 10.0 * q + vec2(-0.1 * uTime, 0.1 * uTime));
        float fbmResult = mix(f1, f2, 0.5);

        fbmResult *= 0.85;
        fbmResult = pow(fbmResult, 3.0);
        vec3 grayscaleColor = vec3(fbmResult);
        vec3 tint = vec3(0.2, 0.2, 1.0);
        vec3 finalColor = mix(grayscaleColor, tint, 0.5);

        gl_FragColor = vec4(finalColor, fbmResult);
    }
`;

export const wispyFragmentShader = `
    uniform float uTime;
    uniform vec2 uResolution;

    ${fbmUtils}

    void main() {
        vec2 st = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;

        float fbmResult = fbm6(st * 2.0 + vec2(uTime * -0.1));
        fbmResult *= 0.5;
        vec3 grayscaleColor = vec3(fbmResult);
        vec3 tint = vec3(0.2, 0.2, 1.0);
        vec3 finalColor = mix(grayscaleColor, tint, 0.5);
        gl_FragColor = vec4(finalColor, fbmResult);
    }
`;
