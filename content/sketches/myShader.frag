precision mediump float;

uniform bool value;
uniform bool lightness;
uniform sampler2D texture;
uniform bool uv;

varying vec2 texcoords2;

// Returns the HSV value V
float v_value(vec4 texel) {
  return max(texel.r, max(texel.g, texel.b));
}

// Returns the HSL lightness L
float l_value(vec4 texel) {
  return 1.0/2.0*(max(texel.r, max(texel.g, texel.b)) + min(texel.r, min(texel.g, texel.b)));
}

void main() {
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = uv ? vec4(texcoords2.st, 0.0, 1.0) : value ? vec4(vec3(v_value(texel)), 1.0) : lightness ? vec4(vec3(l_value(texel)), 1.0) : texel;
}