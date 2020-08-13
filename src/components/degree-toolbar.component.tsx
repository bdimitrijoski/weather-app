import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TemperatureUnit } from '../domain/enums/temperature-unit.enum';
import { RootState } from '../store';
import { switchUnits } from '../store/actions/weatherActions';

const DegreeToolbarComponent = () => {
    const dispatch = useDispatch();
    const units = useSelector((state: RootState) => state.weather.units);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(switchUnits(event.target.value as TemperatureUnit));
    };

    return (
        <div>
            <div className="pull-right">
                <RadioGroup name="units" className="pull-right" value={units} row onChange={handleChange}>
                    <FormControlLabel value="imperial" color="primary" labelPlacement="end" control={<Radio />} label="Fahrenheit" />
                    <FormControlLabel value="metric" color="primary" labelPlacement="end" control={<Radio />} label="Celcius" />
                </RadioGroup>
            </div>
        </div>
    );
};

export default DegreeToolbarComponent;
