import './App.css'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function App() {

  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </>
  )
}

export default App
