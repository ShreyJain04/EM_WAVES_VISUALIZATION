// src/components/EmWaveVisualization.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { useParameters } from './context';

// Constants for wave properties
let amplitudeX = 2; // Amplitude of the electric field in the x-direction
let amplitudeY = 2; // Amplitude of the electric field in the y-direction
let frequency = 1; // Frequency of oscillation
let phaseDifference = Math.PI / 2; // Phase difference between x and y components
let eta =1 ;
let wavelength = 4 ;
let mfield = 0 ;
let efield = 1 ;

// Function to create a text label as a sprite
const createTextLabel = (text, color = 'black') => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = '48px Arial';
    context.fillStyle = color;
    context.fillText(text, 0, 48); // Adjust position as needed
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(2, 2, 2); // Adjust scale for desired size

    return sprite;
};

// Main EM wave visualization component
const EmWaveVisualization = () => {
    const { parameters } = useParameters();
    amplitudeX = parameters.amplitudeX;
    amplitudeY = parameters.amplitudeY;
    phaseDifference = (parameters.phase_diff / 180) * Math.PI;
    frequency = parameters.frequency;
    mfield = parameters.mfield ;
    efield = parameters.efield ;
    wavelength = parameters.wavelength ;
    eta = parameters.eta ;

    // wavelength = 4 ;
    return (
        <Canvas style={{ width: '100%', height: '100vh' }} camera={{ position: [6, 6, 8] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            {efield && <ElectricFieldWave />}
            {mfield && <MagneticFieldWave/>}
            {efield && <PolarizationEllipse />}
            <GridHelper />
            <AxisLabels /> {/* Add axis labels */}
        </Canvas>
    );
};

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
            const y = amplitudeY * Math.cos(waveNumber * z - angularFrequency * time + phaseDifference); // Oscillate in y with phase difference

            const direction = new THREE.Vector3(x, y, 0).normalize();
            const length = Math.sqrt(x * x + y * y);
            let arrow;
            if (i !== numArrows / 2) {
                arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, z), length, 0xff0000, 0.2, 0.1);
            } else {
                arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, z), length, 0x0000ff, 0.2, 0.1);
            }
            fieldGroup.current.add(arrow);
        }
    });

    return <group ref={fieldGroup} />;
}

const MagneticFieldWave = () => {
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
            const x = amplitudeX * Math.cos(waveNumber * z - angularFrequency * time) / eta; // Oscillate in x
            const y = amplitudeY * Math.cos(waveNumber * z - angularFrequency * time + phaseDifference) /eta; // Oscillate in y with phase difference

            const direction = new THREE.Vector3(y, -x, 0).normalize();
            const length = Math.sqrt(x * x + y * y);
            let arrow;
            arrow = new THREE.ArrowHelper(direction, new THREE.Vector3(0, 0, z), length, 0x00ff00, 0.2, 0.1);
            fieldGroup.current.add(arrow);
        }
    });

    return <group ref={fieldGroup} />;
}

// Component to add an ellipse representing the overall polarization path
const PolarizationEllipse = () => {
    const points = [];
    const numPoints = 100; // Number of points to form the ellipse
    for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI;
        const x = amplitudeX * Math.cos(t);
        const y = amplitudeY * Math.cos(t + phaseDifference);
        points.push(new THREE.Vector3(x, y, 0));
    }

    const ellipseGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={ellipseGeometry}>
            <lineBasicMaterial color={0x0000ff} linewidth={2} />
        </line>
    );
};

// Helper component to display grid and axes
const GridHelper = () => (
    <group>
        <gridHelper args={[12, 12]} rotation={[Math.PI / 2, 0, 0]} />
        <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 12, 0x000000]} />
        <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 12, 0x000000]} />
        <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 12, 0x000000]} />
    </group>
);

// Component to add axis labels
const AxisLabels = () => {
    const xLabel = createTextLabel('x', 'red');
    xLabel.position.set(8, 0, 0);

    const yLabel = createTextLabel('y', 'green');
    yLabel.position.set(1, 5, 0);

    const zLabel = createTextLabel('z', 'blue');
    zLabel.position.set(0, 0, 8);

    return (
        <group>
            <primitive object={xLabel} />
            <primitive object={yLabel} />
            <primitive object={zLabel} />
        </group>
    );
};

export default EmWaveVisualization;
