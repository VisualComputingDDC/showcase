#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_zoom;

vec2 rotate2D (vec2 _st, float _angle) {
  _st -= 0.5;
  _st = mat2(cos(_angle), -sin(_angle),
            sin(_angle), cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

vec2 tile (vec2 _st, float _zoom) {
  _st *= _zoom;
  return fract(_st);
}

vec2 rotateTilePattern(vec2 _st) {
  _st *= 2.0;
  
  float index = 0.0;
  index += step(1., mod(_st.x,2.0));
  index += step(1., mod(_st.y,2.0))*2.0;
  
  _st = fract(_st);
  
  if(index == 1.0){
    _st = rotate2D(_st,PI*0.5);
  } else if(index == 2.0){
    _st = rotate2D(_st,PI*-0.5);
  } else if(index == 3.0){
    _st = rotate2D(_st,PI);
  }
  
  return _st;
}

void main (void) {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  
  st = tile(st, u_zoom);
  st = rotateTilePattern(st);
  
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);
  float d = 0.0;
  
  st = st *2.-1.;
  
  d = length( abs(st)-.3 );
  d = length( min(abs(st)-.3,0.) );

  gl_FragColor = vec4(vec3(fract(d*10.0)),1.0);
}