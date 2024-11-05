// src/components/EmWaveVisualization.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

// Constants for wave properties
const amplitudeX = 2; // Amplitude of the electric field in the x-direction
const amplitudeY = 1; // Amplitude of the electric field in the y-direction
const wavelength = 4; // Wavelength of the wave
const frequency = 0.1; // Frequency of oscillation
const phaseDifference = Math.PI / 2; // Phase difference between x and y components

// Main EM wave visualization component
const EmWaveVisualization = () => (
    <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <ElectricFieldWave />
        <GridHelper />
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
        const spacing = 0.2; // Distance between each arrow along z-axis

        // Clear existing arrows
        while (fieldGroup.current.children.length) {
            fieldGroup.current.remove(fieldGroup.current.children[0]);
        }

        // Create arrows to represent the electric field oscillating in both x and y directions
        for (let i = 0; i < numArrows; i++) {
            const z = i * spacing - (numArrows * spacing) / 2; // Position along z-axis
            const x = amplitudeX * Math.cos(waveNumber * z - angularFrequency * time); // Oscillate in x
            const y = amplitudeX * Math.cos(waveNumber * z - angularFrequency * time + phaseDifference); // Oscillate in y with phase difference

            const direction = new THREE.Vector3(x, y, 0).normalize();
            const length = Math.sqrt(x * x + y * y);

            const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, z), length, 0xff0000,0.2,0.1);
            fieldGroup.current.add(arrow);
        }
    });

    return <group ref={fieldGroup} />;
};

// Helper component to display grid and axes
const GridHelper = () => (
    <group>
        <gridHelper args={[12, 12]} rotation={[Math.PI / 2, 0, 0]} />
        <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 5, 0xff0000]} />
        <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 5, 0x00ff00]} />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 5, 0x0000ff]} />
    </group>
);

export default EmWaveVisualization;


// // src/components/EmWaveVisualization.js
// import React, { useRef, useEffect } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';
// import { OrbitControls } from '@react-three/drei';

// // Constants for wave properties
// const amplitude = 2; // E_0, amplitude of the electric field
// const wavelength = 4; // lambda, wavelength of the wave
// const frequency = 0.5; // frequency of oscillation

// // Main EM wave visualization component
// const EmWaveVisualization = () => (
//     <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [0, 5, 10] }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <OrbitControls />
//         <ElectricFieldWave />
//         <AxesHelper />
//     </Canvas>
// );

// // Component to create oscillating electric field wave
// const ElectricFieldWave = () => {
//     const fieldGroup = useRef();

//     // Define wave properties
//     const waveNumber = (2 * Math.PI) / wavelength;
//     const angularFrequency = 2 * Math.PI * frequency;

//     useFrame(({ clock }) => {
//         const time = clock.getElapsedTime();
//         const numArrows = 1; // Number of arrows to visualize the field
//         const spacing = 0.2; // Distance between each arrow

//         // Clear existing arrows
//         while (fieldGroup.current.children.length) {
//             fieldGroup.current.remove(fieldGroup.current.children[0]);
//         }

//         // Create arrows to represent the electric field oscillating in x-direction
//         for (let i = 0; i < numArrows; i++) {
//             const z = i * spacing - (numArrows * spacing) / 2; // Position along z-axis
//             const x = amplitude * Math.cos(waveNumber * z - angularFrequency * time); // Oscillate in x
//             // const y = amplitude * Math.cos(waveNumber * z - angularFrequency * time); // Oscillate in x


//             const direction = new THREE.Vector3(x, 0, 0).normalize();
//             const length = Math.abs(x);

//             // const direction2 = new THREE.Vector3(0, x, 0).normalize();
//             // const length2 = Math.abs(y);

//             const arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, z), length, 0xff0000);
//             // const arrow2 = new THREE.ArrowHelper(direction2, new THREE.Vector3(0, 0, z), length2, "green");
//             fieldGroup.current.add(arrow);
//             // fieldGroup.current.add(arrow2);
//         }
//     });

//     return <group ref={fieldGroup} />;
// };

// // Helper component to display axes
// const AxesHelper = () => (
//     <group>
//         //<arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 5, 0xff0000]} />
//         //<arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 5, 0x00ff00]} />
//         //<arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 20, 0x0000ff]} />
//     </group>
// );

// export default EmWaveVisualization;
