import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import { Temperature } from '../models/temperature.model';

@JsonConverter
export class TemperatureDataMapper implements JsonCustomConvert<Temperature> {
    serialize(temperature: Temperature): number {
        return temperature.value;
    }

    deserialize(value: number): Temperature {
        return new Temperature(value);
    }
}
