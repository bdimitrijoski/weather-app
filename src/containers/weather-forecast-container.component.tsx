import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { RootState } from '../store';
import { getWeather, setLoading, setForecastActive, setPageIndex } from '../store/actions/weatherActions';
import DailyWeatherForecast from '../components/daily-weather-forecast.component';
import HourlyForecastComponent from '../components/hourly-weather-forecast.component';
import DaysToolbarComponent from '../components/days-toolbar.component';
import DegreeToolbarComponent from '../components/degree-toolbar.component';
import { WeatherForecast } from '../domain/models/weather-forecast.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

const WeatherForecastContainer = () => {
    const dispatch = useDispatch();
    const pageIndex = useSelector((state: RootState) => state.weather.pageIndex);
    const weatherData = useSelector((state: RootState) => (state.weather.data ? state.weather.data.slice(pageIndex, pageIndex + 3) : []));
    const currentForecast = useSelector((state: RootState) => state.weather.currentForecast);
    const units = useSelector((state: RootState) => state.weather.units);
    const loading = useSelector((state: RootState) => state.weather.loading);

    useEffect(() => {
        dispatch(setLoading());
        dispatch(getWeather());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDayCardClickHandler = (data: WeatherForecast) => {
        dispatch(setForecastActive(data));
    };

    const onPageIndexChangedHandler = (newPageIndex: number) => {
        dispatch(setPageIndex(newPageIndex));
    };

    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            <h1>Weather in Munich</h1>
            {loading ? (
                <h2 className="is-size-3 py-2">Loading...</h2>
            ) : (
                <div>
                    <DegreeToolbarComponent />

                    <div className="clearfix" />
                    <div className="heading">
                        <h2>Daily</h2>
                        <div className="pull-right">
                            <DaysToolbarComponent pageIndex={pageIndex} onPageIndexChanged={onPageIndexChangedHandler} />
                        </div>
                    </div>
                    <div className={classes.root}>
                        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                            {!loading &&
                                weatherData &&
                                weatherData.map((data, i) => (
                                    <Grid item xs={4} sm={4} key={data.getHashCode()}>
                                        <DailyWeatherForecast
                                            data={data}
                                            units={units}
                                            isActive={data.getHashCode() === currentForecast.getHashCode()}
                                            onDayCardClick={onDayCardClickHandler}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                    <div className="clearfix" />
                    <br />

                    <div className="heading">
                        <h2>Hourly</h2>
                    </div>
                    <div>{currentForecast ? <HourlyForecastComponent data={currentForecast} units={units} /> : ''}</div>
                </div>
            )}
        </Container>
    );
};
export default WeatherForecastContainer;
