precision highp float;

uniform sampler2D tex0;
uniform vec2 texelSize;
uniform float kernel[9];
uniform float kernelWeight;

varying vec2 vTexCoord;

void main() {
  vec2 texCoord = vec2(1.0 - vTexCoord.x, vTexCoord.y); // Flip x-coordinate
  vec4 sum = vec4(0.0);
  
  


  sum += texture2D(tex0, texCoord + vec2(-1.0, -1.0) * texelSize) * kernel[0];
  sum += texture2D(tex0, texCoord + vec2(0.0, -1.0) * texelSize) * kernel[1];
  sum += texture2D(tex0, texCoord + vec2(1.0, -1.0) * texelSize) * kernel[2];
  sum += texture2D(tex0, texCoord + vec2(-1.0, 0.0) * texelSize) * kernel[3];
  sum += texture2D(tex0, texCoord) * kernel[4];
  sum += texture2D(tex0, texCoord + vec2(1.0, 0.0) * texelSize) * kernel[5];
  sum += texture2D(tex0, texCoord + vec2(-1.0, 1.0) * texelSize) * kernel[6];
  sum += texture2D(tex0, texCoord + vec2(0.0, 1.0) * texelSize) * kernel[7];
  sum += texture2D(tex0, texCoord + vec2(1.0, 1.0) * texelSize) * kernel[8];

  gl_FragColor = sum / kernelWeight;
}