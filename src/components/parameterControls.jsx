import React, { useEffect } from 'react';
import { Slider, Typography, RadioGroup, FormControlLabel, Radio,Checkbox } from '@mui/material';
import { useParameters } from './context';
import Button from '@mui/material/Button';

const ParameterControls = () => {
    const { parameters, handleParameterChange } = useParameters();

    useEffect(() => {
        if (parameters.mode === 'electric') {
            handleParameterChange('mfield', 0);
            handleParameterChange('efield', 1);
        } else {
            handleParameterChange('mfield', 1);
            handleParameterChange('efield', 0);
        }
    }, [parameters.mode]);

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h6">Field Type</Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={parameters.efield === 1}
                        onChange={(e) => handleParameterChange('efield', e.target.checked ? 1 : 0)}
                    />
                }
                label="Electric Field"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={parameters.mfield === 1}
                        onChange={(e) => handleParameterChange('mfield', e.target.checked ? 1 : 0)}
                    />
                }
                label="Magnetic Field"
            />

            <Typography variant="h6">X Amplitude (meters)</Typography>
            <Slider
                value={parameters.amplitudeX}
                min={1}
                max={10}
                step={0.1}
                onChange={(e, value) => handleParameterChange('amplitudeX', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Y Amplitude (meters)</Typography>
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
                min={-90}
                max={90}
                step={5}
                onChange={(e, value) => handleParameterChange('phase_diff', value)}
                valueLabelDisplay="auto"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '-10px' }}>
                <Typography variant="body2" color="textSecondary">RHCP</Typography>
                <Typography variant="body2" color="textSecondary">LHCP</Typography>
            </div>
            
            <Typography variant="h6">Frequency (Hertz)</Typography>
            <Slider
                value={parameters.frequency}
                min={0}
                max={2}
                step={0.1}
                onChange={(e, value) => handleParameterChange('frequency', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Wavelength (meters)</Typography>
            <Slider
                value={parameters.wavelength}
                min={0}
                max={10}
                step={0.5}
                onChange={(e, value) => handleParameterChange('wavelength', value)}
                valueLabelDisplay="auto"
            />
            <Typography variant="h6">Intrinsic Impedance (ohm)</Typography>
            <Slider
                value={parameters.eta}
                min={1}
                max={10}
                step={0.5}
                onChange={(e, value) => handleParameterChange('eta', value)}
                valueLabelDisplay="auto"
            />
            <div style={{marginTop:4, fontSize:17}}>
                Wave velocity = {parameters.frequency * parameters.wavelength} m/s
            </div>
        </div>
    );
};

export default ParameterControls;
