/* NOIR KINETIC — WebGL fluid/smoke background for the hero, inspired by the
  Flow Design Agency splash effect but adapted to our grayscale identity.
  Weekend mode re-tones the same layer to a subtle ink-on-paper wash. */
import { useEffect, useRef } from "react";

const CFG = {
  SIM_RES: 128,
  DYE_RES: 512,
  DENSITY_DISSIPATION: 6,
  VELOCITY_DISSIPATION: 3,
  PRESSURE: 0.5,
  PRESSURE_ITERS: 15,
  CURL: 12,
  SPLAT_RADIUS: 0.35,
  SPLAT_FORCE: 4000,
};

type FBO = { tex: WebGLTexture; fbo: WebGLFramebuffer; width: number; height: number; attach: (id: number) => number };

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh) ?? "shader compile failed";
    gl.deleteShader(sh);
    throw new Error(log);
  }
  return sh;
}

function program(gl: WebGLRenderingContext, vert: string, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) ?? "program link failed");
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) {
    const info = gl.getActiveUniform(p, i);
    if (info) uniforms[info.name] = gl.getUniformLocation(p, info.name)!;
  }
  return { bind: () => gl.useProgram(p), uniforms };
}

const VERT = `
attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

function makePrograms(gl: WebGLRenderingContext) {
  return {
    splat: program(gl, VERT, `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `),
    advection: program(gl, VERT, `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;
      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
      }
    `),
    divergence: program(gl, VERT, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;
        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) L = -C.x;
        if (vR.x > 1.0) R = -C.x;
        if (vT.y > 1.0) T = -C.y;
        if (vB.y < 0.0) B = -C.y;
        gl_FragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
      }
    `),
    curl: program(gl, VERT, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `),
    vorticity: program(gl, VERT, `
      precision highp float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;
        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
    `),
    pressure: program(gl, VERT, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `),
    gradientSubtract: program(gl, VERT, `
      precision mediump float;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `),
    display: program(gl, VERT, `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform float opacity;
      uniform float inkMode;
      void main () {
        float d = texture2D(uTexture, vUv).r;
        float density = smoothstep(0.0, 0.42, d);
        float smoke = density * 0.86;
        vec3 pigment = inkMode > 0.5 ? vec3(0.0) : vec3(smoke);
        float alpha = density * (inkMode > 0.5 ? 0.46 : 0.58) * opacity;
        gl_FragColor = vec4(pigment, alpha);
      }
    `),
  };
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number): FBO {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  return { tex, fbo, width: w, height: h, attach: (id: number) => { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, tex); return id; } };
}

function createDoubleFBO(gl: WebGLRenderingContext, w: number, h: number): { read: FBO; write: FBO; swap: () => void } {
  let read = createFBO(gl, w, h);
  let write = createFBO(gl, w, h);
  return {
    read,
    write,
    swap() {
      const t = read; read = write; write = t;
    },
  };
}

export default function FluidHeroBg({ weekend }: { weekend: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smokeTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const smokeLayer = smokeTrailRef.current;
    let lastSmokeAt = 0;

    const emitSmokePuff = (clientX: number, clientY: number, force = false) => {
      if (!smokeLayer) return;
      const rect = canvas.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }

      const now = performance.now();
      if (!force && now - lastSmokeAt < 108) return;
      lastSmokeAt = now;

      const puff = document.createElement("span");
      const size = 210 + Math.round(Math.random() * 120);
      puff.className = "lumora-smoke-puff";
      puff.style.left = `${clientX - rect.left}px`;
      puff.style.top = `${clientY - rect.top}px`;
      puff.style.setProperty("--smoke-size", `${size}px`);
      puff.style.setProperty("--smoke-drift-x", `${(Math.random() - 0.5) * 94}px`);
      puff.style.setProperty("--smoke-drift-y", `${-36 - Math.random() * 64}px`);
      smokeLayer.appendChild(puff);
      puff.addEventListener("animationend", () => puff.remove(), { once: true });
    };

    const createSmokePuff = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      emitSmokePuff(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", createSmokePuff, { passive: true });
    window.requestAnimationFrame(() => {
      const rect = canvas.getBoundingClientRect();
      [
        [0.68, 0.62],
        [0.75, 0.57],
        [0.8, 0.66],
      ].forEach(([x, y]) => {
        emitSmokePuff(rect.left + rect.width * x, rect.top + rect.height * y, true);
      });
    });
    const removeSmokeTrail = () => {
      window.removeEventListener("pointermove", createSmokePuff);
    };

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return removeSmokeTrail;

    let p: ReturnType<typeof makePrograms>;
    try {
      p = makePrograms(gl);
    } catch {
      return removeSmokeTrail;
    }
    const simW = CFG.SIM_RES, simH = Math.floor(CFG.SIM_RES * 0.8);
    const dyeW = CFG.DYE_RES, dyeH = Math.floor(CFG.DYE_RES * 0.8);
    const velocity = createDoubleFBO(gl, simW, simH);
    const dye = createDoubleFBO(gl, dyeW, dyeH);
    const divergence = createFBO(gl, simW, simH);
    const curlFbo = createFBO(gl, simW, simH);
    const pressure = createDoubleFBO(gl, simW, simH);

    // fullscreen quad
    const quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const idx = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idx);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const blit = (target: FBO | null) => {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        gl.viewport(0, 0, target.width, target.height);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    const smokeAmount = weekend ? 0.38 : 0.52;
    const splat = (x: number, y: number, dx: number, dy: number, amt = smokeAmount) => {
      p.splat.bind();
      gl.uniform1i(p.splat.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(p.splat.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(p.splat.uniforms.point, x, y);
      gl.uniform3f(p.splat.uniforms.color, dx, dy, 0);
      gl.uniform1f(p.splat.uniforms.radius, CFG.SPLAT_RADIUS / 100);
      blit(velocity.write);
      velocity.swap();

      p.splat.bind();
      gl.uniform1i(p.splat.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(p.splat.uniforms.color, amt, amt, amt);
      blit(dye.write);
      dye.swap();
    };

    let lastX = 0, lastY = 0, active = false;
    let raf = 0;
    let autoTimer = 0;

    const onMove = (clientX: number, clientY: number, down: boolean) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = rect.height - (clientY - rect.top);
      if (active && !down) return;
      const dx = (x - lastX) * CFG.SPLAT_FORCE;
      const dy = (y - lastY) * CFG.SPLAT_FORCE;
      active = down;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        splat(x / rect.width, y / rect.height, dx, dy);
      }
      lastX = x;
      lastY = y;
    };
    const moveHandler = (e: MouseEvent) => onMove(e.clientX, e.clientY, e.buttons > 0);
    const moveAny = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = rect.height - (e.clientY - rect.top);
      active = false;
      // light ambient response to mere hover (no click)
      splat(lastX / rect.width, lastY / rect.height, 80, 40, smokeAmount * 0.6);
    };

    // ambient drift: occasional random splats so the smoke is never dead
    const ambient = () => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.random();
      const y = Math.random();
      splat(x, y, (Math.random() - 0.5) * 600, (Math.random() - 0.5) * 600, smokeAmount * 0.34);
    };

    canvas.addEventListener("mousemove", moveAny);
    window.addEventListener("mousemove", moveHandler);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let previousTime = performance.now();
    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min(0.016, Math.max(0.001, (now - previousTime) / 1000));
      previousTime = now;
      gl.disable(gl.BLEND);

      p.curl.bind();
      gl.uniform2f(p.curl.uniforms.texelSize, 1 / velocity.read.width, 1 / velocity.read.height);
      gl.uniform1i(p.curl.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlFbo);

      p.vorticity.bind();
      gl.uniform2f(p.vorticity.uniforms.texelSize, 1 / velocity.read.width, 1 / velocity.read.height);
      gl.uniform1i(p.vorticity.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(p.vorticity.uniforms.uCurl, curlFbo.attach(1));
      gl.uniform1f(p.vorticity.uniforms.curl, CFG.CURL);
      gl.uniform1f(p.vorticity.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      p.divergence.bind();
      gl.uniform2f(p.divergence.uniforms.texelSize, 1 / velocity.read.width, 1 / velocity.read.height);
      gl.uniform1i(p.divergence.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      p.pressure.bind();
      gl.uniform2f(p.pressure.uniforms.texelSize, 1 / pressure.read.width, 1 / pressure.read.height);
      gl.uniform1i(p.pressure.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < CFG.PRESSURE_ITERS; i++) {
        gl.uniform1i(p.pressure.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write);
        pressure.swap();
      }

      p.gradientSubtract.bind();
      gl.uniform2f(p.gradientSubtract.uniforms.texelSize, 1 / velocity.read.width, 1 / velocity.read.height);
      gl.uniform1i(p.gradientSubtract.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(p.gradientSubtract.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      p.advection.bind();
      gl.uniform2f(p.advection.uniforms.texelSize, 1 / velocity.read.width, 1 / velocity.read.height);
      gl.uniform1i(p.advection.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(p.advection.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(p.advection.uniforms.dt, dt);
      gl.uniform1f(p.advection.uniforms.dissipation, CFG.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl.uniform2f(p.advection.uniforms.texelSize, 1 / dye.read.width, 1 / dye.read.height);
      gl.uniform1i(p.advection.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(p.advection.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(p.advection.uniforms.dissipation, CFG.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();

      // render
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      p.display.bind();
      gl.uniform1i(p.display.uniforms.uTexture, dye.read.attach(0));
      gl.uniform1f(p.display.uniforms.opacity, 1);
      gl.uniform1f(p.display.uniforms.inkMode, weekend ? 1 : 0);
      blit(null);
    };

    ambient();
    const ambientInterval = window.setInterval(ambient, 2200);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(ambientInterval);
      removeSmokeTrail();
      canvas.removeEventListener("mousemove", moveAny);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("resize", resize);
    };
  }, [weekend]);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="lumora-hero-surface absolute inset-0" />
      <div className="lumora-hero-wash absolute inset-0" />
      <div className="lumora-hero-orb lumora-hero-orb-a" />
      <div className="lumora-hero-orb lumora-hero-orb-b" />
      <div className="lumora-hero-band lumora-hero-band-a" />
      <div className="lumora-hero-band lumora-hero-band-b" />
      <div className="lumora-hero-grain absolute inset-0" />
      </div>
      <canvas
        ref={canvasRef}
        className="hero-fluid-canvas pointer-events-none absolute inset-0 z-[2] h-full w-full"
        style={{ willChange: "auto" }}
        aria-hidden="true"
      />
      <div className="lumora-smoke-veil pointer-events-none absolute inset-0 z-[3]" aria-hidden="true" />
      <div
        ref={smokeTrailRef}
        className="lumora-smoke-trail pointer-events-none absolute inset-0 z-[4] overflow-hidden"
        aria-hidden="true"
      />
    </>
  );
}
