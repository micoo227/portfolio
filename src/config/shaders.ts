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
