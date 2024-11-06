// src/components/ParameterControls.js
import React from 'react';
import { Slider, Typography } from '@mui/material';
import { useParameters } from './context';
import Button from '@mui/material/Button';

const ParameterControls = () => {
    const { parameters, handleParameterChange } = useParameters();

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h6">X Amplitude</Typography>
            <Slider
                value={parameters.amplitudeX}
                min={1}
                max={10}
                step={0.1}
                onChange={(e, value) => handleParameterChange('amplitudeX', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Y Amplitude</Typography>
            <Slider
                value={parameters.amplitudeY}
                min={1}
                max={90}
                step={0.5}
                onChange={(e, value) => handleParameterChange('amplitudeY', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Phase Difference (Degrees)</Typography>
            <Slider
                value={parameters.phase_diff}
                min={-180}
                max={180}
                step={5}
                onChange={(e, value) => handleParameterChange('phase_diff', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Frequency</Typography>
            <Slider
                value={parameters.frequency}
                min={0}
                max={2}
                step={0.1}
                onChange={(e, value) => handleParameterChange('frequency', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Wavelength</Typography>
            <Slider
                value={parameters.wavelength}
                min={0}
                max={10}
                step={0.5}
                onChange={(e, value) => handleParameterChange('wavelength', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Intrinsic Impedance</Typography>
            <Slider
                value={parameters.eta}
                min={1}
                max={10}
                step={0.5}
                onChange={(e, value) => handleParameterChange('eta', value)}
                valueLabelDisplay="auto"
            />
            <Button
                style={{margin:10 , color:parameters.mfield===0?"green":"red"}}
                onClick={(e, value) => handleParameterChange('mfield', parameters.mfield===0?1:0)}
                valueLabelDisplay="auto"
            >
                Magnetic Field
            </Button>
            <Button
                style={{margin:10 , color:parameters.efield===0?"green":"red"}}
                onClick={(e, value) => handleParameterChange('efield', parameters.efield===0?1:0)}
                valueLabelDisplay="auto"
            >
                Electric Field
            </Button>
        </div>
    );
};

export default ParameterControls;
