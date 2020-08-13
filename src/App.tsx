import React, { FC } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import WeatherForecastContainer from './containers/weather-forecast-container.component';
import { theme } from './styles';

require('dotenv').config();

const App: FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <div className="weather-bg" />
                <div className="content-wrapper">
                    <CssBaseline />
                    <WeatherForecastContainer />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default App;
