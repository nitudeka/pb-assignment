import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { HorizontalBlurShader } from "three/addons/shaders/HorizontalBlurShader.js";
import { VerticalBlurShader } from "three/addons/shaders/VerticalBlurShader.js";

const renderCanvas = (canvas) => {
  let camera, scene, renderer;

  const meshes = [];

  const PLANE_WIDTH = 2.5;
  const PLANE_HEIGHT = 2.5;
  const CAMERA_HEIGHT = 0.3;

  const state = {
    shadow: {
      blur: 3.5,
      darkness: 1,
      opacity: 1,
    },
    plane: {
      color: "#ffffff",
      opacity: 0,
    },
    showWireframe: false,
  };

  let shadowGroup,
    renderTarget,
    renderTargetBlur,
    shadowCamera,
    cameraHelper,
    depthMaterial,
    horizontalBlurMaterial,
    verticalBlurMaterial;

  let plane, blurPlane, fillPlane;

  init();
  animate();

  function init() {
    camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );
    camera.position.set(0.5, 1, 2);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    window.addEventListener("resize", onWindowResize);

    const geometries = [new THREE.IcosahedronGeometry(0.5)];

    const material = new THREE.MeshNormalMaterial();

    for (let i = 0, l = geometries.length; i < l; i++) {
      const geometry = geometries[i];
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 0;
      mesh.position.x = 0;
      mesh.position.z = 0;
      scene.add(mesh);
      meshes.push(mesh);
    }

    shadowGroup = new THREE.Group();
    shadowGroup.position.y = 1;
    scene.add(shadowGroup);

    renderTarget = new THREE.WebGLRenderTarget(512, 512);
    renderTarget.texture.generateMipmaps = false;

    // the render target that we will use to blur the first render target
    renderTargetBlur = new THREE.WebGLRenderTarget(512, 512);
    renderTargetBlur.texture.generateMipmaps = false;

    // make a plane and make it face up
    const planeGeometry = new THREE.PlaneGeometry(
      PLANE_WIDTH,
      PLANE_HEIGHT,
    ).rotateX(Math.PI / 2);
    const planeMaterial = new THREE.MeshBasicMaterial({
      map: renderTarget.texture,
      opacity: state.shadow.opacity,
      transparent: true,
      depthWrite: false,
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // make sure it's rendered after the fillPlane
    plane.renderOrder = 1;
    shadowGroup.add(plane);

    // the y from the texture is flipped!
    plane.scale.y = -1;

    // the plane onto which to blur the texture
    blurPlane = new THREE.Mesh(planeGeometry);
    blurPlane.visible = false;
    shadowGroup.add(blurPlane);

    // the plane with the color of the ground
    const fillPlaneMaterial = new THREE.MeshBasicMaterial({
      color: state.plane.color,
      opacity: state.plane.opacity,
      transparent: true,
      depthWrite: false,
    });
    fillPlane = new THREE.Mesh(planeGeometry, fillPlaneMaterial);
    fillPlane.rotateX(Math.PI);
    shadowGroup.add(fillPlane);

    // the camera to render the depth material from
    shadowCamera = new THREE.OrthographicCamera(
      -PLANE_WIDTH / 2,
      PLANE_WIDTH / 2,
      PLANE_HEIGHT / 2,
      -PLANE_HEIGHT / 2,
      0,
      CAMERA_HEIGHT,
    );
    shadowCamera.rotation.x = Math.PI / 2; // get the camera to look up
    shadowGroup.add(shadowCamera);

    cameraHelper = new THREE.CameraHelper(shadowCamera);

    // like MeshDepthMaterial, but goes from black to transparent
    depthMaterial = new THREE.MeshDepthMaterial();
    depthMaterial.userData.darkness = { value: state.shadow.darkness };
    depthMaterial.onBeforeCompile = function(shader) {
      shader.uniforms.darkness = depthMaterial.userData.darkness;
      shader.fragmentShader = /* glsl */ `
						uniform float darkness;
						${shader.fragmentShader.replace(
        "gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );",
        "gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );",
      )}
					`;
    };

    depthMaterial.depthTest = false;
    depthMaterial.depthWrite = false;

    horizontalBlurMaterial = new THREE.ShaderMaterial(HorizontalBlurShader);
    horizontalBlurMaterial.depthTest = false;

    verticalBlurMaterial = new THREE.ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial.depthTest = false;

    //

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.useLegacyLights = false;

    //

    new OrbitControls(camera, renderer.domElement);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // renderTarget --> blurPlane (horizontalBlur) --> renderTargetBlur --> blurPlane (verticalBlur) --> renderTarget
  function blurShadow(amount) {
    blurPlane.visible = true;

    // blur horizontally and draw in the renderTargetBlur
    blurPlane.material = horizontalBlurMaterial;
    blurPlane.material.uniforms.tDiffuse.value = renderTarget.texture;
    horizontalBlurMaterial.uniforms.h.value = (amount * 1) / 256;

    renderer.setRenderTarget(renderTargetBlur);
    renderer.render(blurPlane, shadowCamera);

    // blur vertically and draw in the main renderTarget
    blurPlane.material = verticalBlurMaterial;
    blurPlane.material.uniforms.tDiffuse.value = renderTargetBlur.texture;
    verticalBlurMaterial.uniforms.v.value = (amount * 1) / 256;

    renderer.setRenderTarget(renderTarget);
    renderer.render(blurPlane, shadowCamera);

    blurPlane.visible = false;
  }

  function animate() {
    requestAnimationFrame(animate);

    //

    meshes.forEach((mesh) => {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;
    });

    //

    // remove the background
    const initialBackground = scene.background;
    scene.background = null;

    // force the depthMaterial to everything
    cameraHelper.visible = false;
    scene.overrideMaterial = depthMaterial;

    // set renderer clear alpha
    const initialClearAlpha = renderer.getClearAlpha();
    renderer.setClearAlpha(0);

    // render to the render target to get the depths
    renderer.setRenderTarget(renderTarget);
    renderer.render(scene, shadowCamera);

    // and reset the override material
    scene.overrideMaterial = null;
    cameraHelper.visible = true;

    blurShadow(state.shadow.blur);

    // a second pass to reduce the artifacts
    // (0.4 is the minimum blur amout so that the artifacts are gone)
    blurShadow(state.shadow.blur * 0.4);

    // reset and render the normal scene
    renderer.setRenderTarget(null);
    renderer.setClearAlpha(initialClearAlpha);
    scene.background = initialBackground;

    renderer.render(scene, camera);
  }
};

export default renderCanvas;
