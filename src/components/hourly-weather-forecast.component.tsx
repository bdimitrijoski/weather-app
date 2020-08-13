import React, { FC } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { WeatherForecast } from '../domain/models/weather-forecast.model';
import { TemperatureUnit } from '../domain/enums/temperature-unit.enum';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            boxShadow: 'none',
            borderRadius: 0,
        },
    }),
);

export interface HourlyWeatherForecastProps {
    data: WeatherForecast;
    units: TemperatureUnit;
}

const hourlyForecastComponent: FC<HourlyWeatherForecastProps> = ({ data, units }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {data.hourlyForecast &&
                    data.hourlyForecast.map((item, i) => (
                        <Grid item xs={12} md key={item.getHashCode()} title={item.description}>
                            <Paper className={`${classes.paper} weather-card hourly-forecast-card`}>
                                <div className="txt-wrapper img-wrapper">
                                    <img src={`${item.getImageUrl()}`} alt={item.description} />
                                </div>

                                <div className="weather-info-wrapper">
                                    <div className="txt-wrapper">
                                        <p className="txt-wrapper">
                                            {item.avg.toString(units)} <sup>°C</sup>
                                        </p>

                                        <p className="txt-wrapper">{item.time}</p>
                                    </div>
                                    <p className="visible-mobile pull-left">{item.description}</p>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default hourlyForecastComponent;
