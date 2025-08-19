import { Renderer, Camera, Transform, Geometry, Program, Mesh, Texture } from 'ogl';
import React,{ useEffect, useRef } from 'react';

const ImageStrip = ({ images }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderer = new Renderer({ canvas: canvasRef.current, width: window.innerWidth * 0.6, height: window.innerHeight * 0.4 });
    const gl = renderer.gl;
    document.body.appendChild(gl.canvas);

    const camera = new Camera(gl);
    camera.position.z = 3;

    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-0.3, -0.3, 0.3, -0.3, 0.3, 0.3, -0.3, 0.3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]) },
      index: { data: new Uint16Array([0, 1, 2, 0, 2, 3]) },
    });

    const shaders = images.map((imageSrc) => {
      const texture = new Texture(gl);
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => (texture.image = img);

      return new Program(gl, {
        vertex: `
          attribute vec2 position;
          attribute vec2 uv;
          varying vec2 vUv;
          uniform mat4 modelViewMatrix;
          uniform mat4 projectionMatrix;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 0, 1);
          }`,
        fragment: `
          precision highp float;
          uniform sampler2D tMap;
          varying vec2 vUv;
          void main() {
            gl_FragColor = texture2D(tMap, vUv);
          }`,
        uniforms: { tMap: { value: texture } },
      });
    });

    const meshes = shaders.map((shader, i) => {
      const mesh = new Mesh(gl, { geometry, program: shader });
      mesh.position.x = i * 1.2 - (images.length / 2);
      mesh.setParent(scene);
      return mesh;
    });

    let time = 0;
    const animate = () => {
      time += 0.005;
      meshes.forEach((mesh) => {
        mesh.position.x -= 0.005;
        if (mesh.position.x < -images.length) {
          mesh.position.x += images.length * 2;
        }
      });
      renderer.render({ scene, camera });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      gl.canvas.remove();
    };
  }, [images]);

  return (
    <div className="flex flex-col items-center py-16">
      <h2 className="text-3xl font-bold text-primary mb-6">Our Sponsors</h2>
      <canvas ref={canvasRef} style={{ width: '60vw', height: '40vh', position: 'relative' }} />
    </div>
  );
};

export default ImageStrip;
