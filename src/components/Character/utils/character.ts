import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadEncryptedFallback = async (
    resolve: (value: GLTF | null) => void,
    reject: (reason?: any) => void
  ) => {
    try {
      const encryptedBlob = await decryptFile(
        "/models/character.enc",
        "Character3D#@"
      );
      const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

      let character: THREE.Object3D;
      loader.load(
        blobUrl,
        async (gltf) => {
          character = gltf.scene;
          await renderer.compileAsync(character, camera, scene);
          character.traverse((child: any) => {
            if (child.isMesh) {
              const mesh = child as THREE.Mesh;
              child.castShadow = true;
              child.receiveShadow = true;
              mesh.frustumCulled = true;
            }
          });
          resolve(gltf);
          setCharTimeline(character, camera);
          setAllTimeline();
          const footR = character.getObjectByName("footR");
          if (footR) footR.position.y = 3.36;
          const footL = character.getObjectByName("footL");
          if (footL) footL.position.y = 3.36;
          dracoLoader.dispose();
        },
        undefined,
        (error) => {
          console.error("Error loading fallback encrypted model:", error);
          reject(error);
        }
      );
    } catch (err) {
      reject(err);
      console.error(err);
    }
  };

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      // First try loading unencrypted character.glb directly
      loader.load(
        "/models/character.glb",
        async (gltf) => {
          try {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            const footR = character.getObjectByName("footR");
            if (footR) footR.position.y = 3.36;
            const footL = character.getObjectByName("footL");
            if (footL) footL.position.y = 3.36;
            dracoLoader.dispose();
          } catch (e) {
            console.warn("Direct GLB load failed to configure, falling back to encrypted model:", e);
            loadEncryptedFallback(resolve, reject);
          }
        },
        undefined,
        (error) => {
          console.log("Direct GLB load not found or failed, falling back to encrypted model:", error);
          loadEncryptedFallback(resolve, reject);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
