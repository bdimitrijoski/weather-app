import { JsonObject, JsonProperty } from 'json2typescript';
import { Model } from './model';
import { WeatherInfo } from './weather-info.model';
import { WeatherInfoDataMapper } from '../data-mappers/weather-info.data-mapper';
import { DateDataMapper } from '../data-mappers/date.data-mapper';
import { WeatherInfoDTO } from './weather-info.dto';

export interface WeatherForecastParams {
    date: string;
    forecast: WeatherInfoDTO[];
}

@JsonObject('WeatherForecast')
export class WeatherForecast extends Model {
    @JsonProperty('date', String)
    date: string = undefined;

    @JsonProperty('date', DateDataMapper)
    displayDate: string = undefined;

    @JsonProperty('forecast', [WeatherInfo])
    hourlyForecast: WeatherInfo[] = undefined;

    @JsonProperty('forecast', WeatherInfoDataMapper)
    weather: WeatherInfo = undefined;

    constructor(params: WeatherForecastParams) {
        super();
        Object.assign(this, params);
    }

    getImageUrl(): string {
        if (!this.weather) {
            return '';
        }
        return `http://openweathermap.org/img/wn/${this.weather.icon.replace('n', 'd')}@2x.png`;
    }

    getHashCode(): string {
        return btoa(`${this.date}`);
    }
}
