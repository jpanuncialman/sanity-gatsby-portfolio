import * as THREE from 'three';
export default canvas => {
  const scene = buildScene(); 
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions); 
  const sceneSubjects = createSceneSubjects(scene);
  function buildScene() { 
      
   }
  function buildRender() { 
      const { width, height } = canvas;
   }
  function buildCamera() {
    const { width, height } = canvas;
   }
  function createSceneSubjects(scene) { }
  function update() { }
  function onWindowResize() { 

  }
  return {
    update,
    onWindowResize
  }
}