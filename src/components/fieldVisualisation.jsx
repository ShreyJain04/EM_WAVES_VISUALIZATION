// // src/components/FieldVisualization.js
// import React, { useRef, useEffect } from 'react';
// import { Canvas, useFrame, extend } from '@react-three/fiber';
// import { useParameters } from './context';
// import { Vector3, ArrowHelper, PlaneGeometry } from 'three';

// // Extend PlaneGeometry for R3F
// extend({ PlaneGeometry });

// const FieldArrows = ({ fieldDirection, intensityColor }) => {
//     const arrowGroup = useRef();

//     useEffect(() => {
//         if (arrowGroup.current) {
//             // Clear previous arrows
//             while (arrowGroup.current.children.length) {
//                 arrowGroup.current.remove(arrowGroup.current.children[0]);
//             }

//             // Add arrows based on new parameters
//             for (let i = -5; i <= 5; i++) {
//                 const arrow = new ArrowHelper(
//                     fieldDirection,
//                     new Vector3(i, 0, 0),
//                     1, // length of arrow
//                     intensityColor
//                 );
//                 arrowGroup.current.add(arrow);
//             }
//         }
//     }, [fieldDirection, intensityColor]);

//     return <group ref={arrowGroup}></group>;
// };

// const FieldVisualization = () => {
//     const { parameters } = useParameters();

//     // Calculate direction based on boundary orientation
//     const fieldDirection = new Vector3(
//         Math.cos(parameters.boundaryOrientation * (Math.PI / 180)),
//         Math.sin(parameters.boundaryOrientation * (Math.PI / 180)),
//         90
//     );

//     // Calculate color intensity based on field intensity
//     const intensityColor = `rgb(${Math.min(parameters.intensity * 12, 255)}, 0, ${255 - Math.min(parameters.intensity * 12, 255)})`;

//     return (
//         <Canvas style={{ height: '100vh', background: '#f0f0f0' }}>
//             {/* Boundary Plane */}
//             <mesh rotation={[0, 0, parameters.boundaryOrientation * (Math.PI / 180)]}>
//                 <planeGeometry args={[5, 0.05]} />
//                 <meshBasicMaterial color="#333" />
//             </mesh>

//             {/* Field Arrows */}
//             <FieldArrows fieldDirection={fieldDirection} intensityColor={intensityColor} />
//         </Canvas>
//     );
// };

// export default FieldVisualization;


// // src/components/FieldVisualization3D.js
// import React, { useRef } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { useParameters } from './context';
// import * as THREE from 'three';

// const FieldVisualization3D = () => (
//     <Canvas style={{ width: '100%', height: '500px' }} camera={{ position: [3, 3, 3] }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <OrbitControls />
//         <FieldContent />
//     </Canvas>
// );

// // Child component to hold the 3D objects
// const FieldContent = () => {
//     const { parameters } = useParameters(); // Move hook inside Canvas content component
//     const fieldGroup = useRef();

//     return (
//         <group ref={fieldGroup} rotation={[0, parameters.boundaryOrientation * (Math.PI / 180), 0]}>
//             {/* Plane to represent dielectric boundary */}
//             <mesh rotation={[Math.PI / 2, 0, 0]}>
//                 <planeGeometry args={[5, 5]} />
//                 <meshStandardMaterial color="lightblue" opacity={0.5} transparent />
//             </mesh>

//             {/* Field lines based on parameter intensity */}
//             <Arrow direction={new THREE.Vector3(1, 0, 0)} length={parameters.intensity} color="black" />
//             <Arrow direction={new THREE.Vector3(0, 1, 0)} length={parameters.intensity} color="black" />
//             <Arrow direction={new THREE.Vector3(0, 0, 1)} length={parameters.intensity} color="black" />
//         </group>
//     );
// };

// // Helper component to create arrows
// const Arrow = ({ direction, length, color }) => {
//     const arrowRef = useRef();
//     if (!arrowRef.current) {
//         arrowRef.current = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, 0), length, color);
//     }
//     return <primitive object={arrowRef.current} />;
// };

// export default FieldVisualization3D;


// src/components/EmWaveVisualization.js
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

// Constants for wave properties
const amplitude = 2; // E_0, amplitude of the electric field
const wavelength = 4; // lambda, wavelength of the wave
const frequency = 0.5; // frequency of oscillation

// Main EM wave visualization component
const EmWaveVisualization = () => (
    <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <ElectricFieldWave />
        <AxesHelper />
    </Canvas>
);

// Component to create oscillating electric field wave
const ElectricFieldWave = () => {
    const fieldGroup = useRef();

    // Define wave properties
    const waveNumber = (2 * Math.PI) / wavelength;
    const angularFrequency = 2 * Math.PI * frequency;

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const numArrows = 100; // Number of arrows to visualize the field
        const spacing = 0.2; // Distance between each arrow

        // Clear existing arrows
        while (fieldGroup.current.children.length) {
            fieldGroup.current.remove(fieldGroup.current.children[0]);
        }

        // Create arrows to represent the electric field oscillating in x-direction
        for (let i = 0; i < numArrows; i++) {
            const z = i * spacing - (numArrows * spacing) / 2; // Position along z-axis
            const x = amplitude * Math.cos(waveNumber * z - angularFrequency * time); // Oscillate in x


            const direction = new THREE.Vector3(x, 0, 0).normalize();
            const length = Math.abs(x);

            const direction2 = new THREE.Vector3(0, x, 0).normalize();
            const length2 = Math.abs(x);

            const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, z), length, 0xff0000);
            const arrow2 = new THREE.ArrowHelper(direction2, new THREE.Vector3(0, 0, z), length2, "green");
            fieldGroup.current.add(arrow);
            fieldGroup.current.add(arrow2);
        }
    });

    return <group ref={fieldGroup} />;
};

// Helper component to display axes
const AxesHelper = () => (
    <group>
        <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 5, 0xff0000]} />
        <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 5, 0x00ff00]} />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 20, 0x0000ff]} />
    </group>
);

export default EmWaveVisualization;
