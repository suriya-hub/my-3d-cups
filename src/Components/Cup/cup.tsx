import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Mug from "../../../public/Mug.jsx";

const Cup = (props: any) => {

  const { frontImage, backImage, hideFrontImage, hideBackImage, outercolor, innercolor } = props;
  return (
    <div style={{ height: "500px", backgroundColor: "ButtonHighlight", }}>
      <Canvas frameloop="demand">
        <OrbitControls />
        <directionalLight intensity={2} />
        <ambientLight intensity={3} />
        <spotLight position={[10, 15, 10]} angle={0.9} />
        <Suspense>
          <Mug
            frontImage={frontImage}
            backImage={backImage}
            hideFrontImage={hideFrontImage}
            hideBackImage={hideBackImage}
            outercolor={outercolor}
            innercolor={innercolor}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Cup;
