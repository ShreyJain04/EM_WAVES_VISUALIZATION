// src/components/ParameterControls.js
import React from 'react';
import { Slider, Typography } from '@mui/material';
import { useParameters } from './context';

const ParameterControls = () => {
    const { parameters, handleParameterChange } = useParameters();

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h6">Dielectric Constant</Typography>
            <Slider
                value={parameters.dielectric}
                min={1}
                max={10}
                step={0.1}
                onChange={(e, value) => handleParameterChange('dielectric', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Electric Field Angle</Typography>
            <Slider
                value={parameters.intensity}
                min={1}
                max={90}
                step={0.5}
                onChange={(e, value) => handleParameterChange('intensity', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Boundary Orientation (Degrees)</Typography>
            <Slider
                value={parameters.boundaryOrientation}
                min={0}
                max={180}
                step={1}
                onChange={(e, value) => handleParameterChange('boundaryOrientation', value)}
                valueLabelDisplay="auto"
            />
        </div>
    );
};

export default ParameterControls;
