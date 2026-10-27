import { ContactShadows, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { forwardRef, Suspense } from "react";
import Mug from "../../../public/Mug.jsx";

const Loader = () => (
  <Html center>
    <div className="stage-loader">
      <span className="spinner" />
      Loading model…
    </div>
  </Html>
);

const Cup = forwardRef((props: any, controlsRef: any) => {
  const { frontImage, backImage, hideFrontImage, hideBackImage, outercolor, innercolor, autoRotate } = props;

  return (
    <Canvas
      frameloop={autoRotate ? "always" : "demand"}
      camera={{ position: [0, 3, -9], fov: 45 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
      dpr={[1, 2]}
    >
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enablePan={false}
        minDistance={4}
        maxDistance={12}
        autoRotate={autoRotate}
        autoRotateSpeed={2}
      />
      <directionalLight intensity={2} position={[5, 8, 5]} />
      <ambientLight intensity={3} />
      <spotLight position={[10, 15, 10]} angle={0.9} />
      <Suspense fallback={<Loader />}>
        <Mug
          frontImage={frontImage}
          backImage={backImage}
          hideFrontImage={hideFrontImage}
          hideBackImage={hideBackImage}
          outercolor={outercolor}
          innercolor={innercolor}
        />
        <ContactShadows position={[0, -1.86, 0]} opacity={0.35} scale={10} blur={2.4} far={4} />
      </Suspense>
    </Canvas>
  );
});

export default Cup;
