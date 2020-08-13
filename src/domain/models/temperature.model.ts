import { JsonObject, JsonProperty } from 'json2typescript';
import { TemperatureUnit } from '../enums/temperature-unit.enum';

@JsonObject('Temperature')
export class Temperature {
    @JsonProperty('value', Number)
    value: number;

    constructor(value: number) {
        this.value = Math.round(value);
    }

    getFahrenheit(): number {
        return Math.round(this.value);
    }

    getCelsius() {
        return Math.round(((this.value - 32) * 5) / 9);
    }

    toString(type?: TemperatureUnit): string {
        const temperature = type && type === TemperatureUnit.Metric ? this.getCelsius() : this.getFahrenheit();
        if (isNaN(temperature)) {
            return '';
        }
        return temperature.toString();
    }
}
