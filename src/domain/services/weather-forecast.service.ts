import { ModelFactory } from '../factories/model-factory';
import { WeatherForecast, WeatherForecastParams } from '../models/weather-forecast.model';
import { WeatherData } from '../types';
import { WeatherForecastResourceService } from './weather-forecast-resource.service';
import { WeatherInfoDTO } from '../models/weather-info.dto';

export class WeatherForecastService {
    private resourceService: WeatherForecastResourceService;

    constructor() {
        this.resourceService = new WeatherForecastResourceService();
    }

    getWeather(): Promise<WeatherForecast[]> {
        return this.resourceService.getWeather().then(data => {
            return this.processData(data);
        });
    }

    private processData(data: WeatherData[]): WeatherForecast[] {
        const dailyForecastData = {} as any;

        let dateStr = '';

        data.forEach(entry => {
            const dateInfo = entry.dt_txt.split(' ');
            const date = dateInfo[0];
            const time = dateInfo[1];
            if (dateStr !== date) {
                dateStr = date;
                dailyForecastData[dateStr] = {
                    date: dateStr,
                    forecast: [],
                } as WeatherForecastParams;
            }

            const weatherInfo = {
                min: +entry.main.temp_min,
                max: +entry.main.temp_max,
                avg: +entry.main.temp,
                description: entry.weather[0].description,
                icon: entry.weather[0].icon,
                time,
                date,
            } as WeatherInfoDTO;

            dailyForecastData[dateStr].forecast.push(weatherInfo);
        });

        return Object.keys(dailyForecastData).map(key =>
            ModelFactory.getInstance().create<WeatherForecast>(WeatherForecast as any, dailyForecastData[key]),
        );
    }
}
