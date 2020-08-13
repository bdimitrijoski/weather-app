import { JsonObject, JsonProperty } from 'json2typescript';
import { Model } from './model';
import { TemperatureDataMapper } from '../data-mappers/temperature.data-mapper';
import { Temperature } from './temperature.model';
import { TimeDataMapper } from '../data-mappers/time.data-mapper';

@JsonObject('WeatherInfo')
export class WeatherInfo extends Model {
    @JsonProperty('avg', TemperatureDataMapper)
    avg: Temperature = undefined;

    @JsonProperty('min', TemperatureDataMapper)
    min: Temperature = undefined;

    @JsonProperty('max', TemperatureDataMapper)
    max: Temperature = undefined;

    @JsonProperty('time', TimeDataMapper)
    time: string = undefined;

    @JsonProperty('description', String)
    description: string = undefined;

    @JsonProperty('icon', String)
    icon: string = undefined;

    @JsonProperty('date', String, true)
    date: string = undefined;

    constructor(params?: Partial<WeatherInfo>) {
        super();
        Object.assign(this, params);
    }

    getHashCode(): string {
        return btoa(`${this.time}_${this.time}`);
    }

    getImageUrl(): string {
        if (!this.icon) {
            return '';
        }
        return `http://openweathermap.org/img/wn/${this.icon.replace('n', 'd')}.png`;
    }
}
