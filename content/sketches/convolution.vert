precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = vec2(aTexCoord.x, aTexCoord.y); // Flip y-coordinate
  gl_Position = vec4(aPosition, 1.0);
  gl_Position.xy = (gl_Position.xy * 2.0 - 1.0) * vec2(1, -1); // Normalize position
}
