import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { FC } from 'react';
import { TemperatureUnit } from '../domain/enums/temperature-unit.enum';
import { WeatherForecast } from '../domain/models/weather-forecast.model';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export interface DailyWeatherForecastProps {
    data: WeatherForecast;
    units: TemperatureUnit;
    isActive: boolean;
    onDayCardClick: Function;
}

const dailyWeatherForecast: FC<DailyWeatherForecastProps> = ({ data, units, isActive, onDayCardClick }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    const getIsActive = () => {
        return isActive ? ' active' : '';
    };

    return (
        <Card className={`${classes.root} weather-card ${getIsActive()}`} onClick={() => onDayCardClick(data)} title="Click to see Details">
            <CardActionArea>
                <img src={`${data.getImageUrl()}`} alt={data.weather.description} />
                <Typography gutterBottom variant="body1" component="p">
                    {data.displayDate}
                </Typography>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.weather.avg.toString(units)} <sup>°C</sup>
                    </Typography>
                    <Typography variant="body2" component="p" className="text-capitalize">
                        {data.weather.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default dailyWeatherForecast;
