import React from 'react'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Model(props) {

  const { nodes, materials } = useGLTF('/mug.gltf')
  const [front] = useTexture([props.frontImage])
  const [back] = useTexture([props.backImage])

  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 4]} scale={[3, 3, 3]} position={[0, -2, 0]}>
        <mesh geometry={nodes.Object_2.geometry}>
          <meshStandardMaterial color={props.outercolor} />
          {!props.hideFrontImage && <Decal
            position={[-0.5, -0.4, 0.62]}
            rotation={[1.6, 5.1, 0]}
            scale={[1.01, 1.01, 1.01]}  // Slightly increased scale
            intensity={1.5}
          // debug
          >
            <meshBasicMaterial
              map={front}
              transparent={true}
              alphaTest={0.5}
              depthWrite={false}
              blending={THREE.NormalBlending}
              side={THREE.DoubleSide}
              premultipliedAlpha={true}
              polygonOffset={true}
              polygonOffsetFactor={-1}    // Push decal slightly above the surface
              polygonOffsetUnits={1}
            />
          </Decal>}
          {!props.hideBackImage && <Decal
            position={[0.7, 0, 0.62]}
            rotation={[1.6, 8.2, 0]}
            scale={[1.01, 1.01, 1.01]}  // Slightly increased scale
            intensity={1.5}
          // debug
          >
            <meshBasicMaterial
              map={back}
              transparent={true}
              alphaTest={0.5}
              depthWrite={false}
              blending={THREE.NormalBlending}
              side={THREE.DoubleSide}
              premultipliedAlpha={true}
              polygonOffset={true}
              polygonOffsetFactor={-1}    // Push decal slightly above the surface
              polygonOffsetUnits={1}
            />
          </Decal>}
        </mesh>
        <mesh geometry={nodes.Object_3.geometry} material={materials['Material.022']} >
          <meshStandardMaterial color={props.innercolor} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/mug.gltf')
