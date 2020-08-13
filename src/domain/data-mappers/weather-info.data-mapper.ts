import { JsonConverter, JsonCustomConvert } from 'json2typescript';
import { WeatherInfo } from '../models/weather-info.model';
import { ModelFactory } from '../factories/model-factory';
import { WeatherInfoDTO } from '../models/weather-info.dto';

@JsonConverter
export class WeatherInfoDataMapper implements JsonCustomConvert<WeatherInfo> {
    serialize(weather: WeatherInfo): WeatherInfoDTO {
        return JSON.parse(JSON.stringify(weather));
    }

    deserialize(data: WeatherInfoDTO[]): WeatherInfo {
        const closestWeatherInfo = this.getClosestWetherInfo(data);
        const isToday = this.isToday(closestWeatherInfo.date);

        const params = isToday ? closestWeatherInfo : this.calcAvgTemperatures(data);

        return ModelFactory.getInstance().create<WeatherInfo>(WeatherInfo, params);
    }

    private calcAvgTemperatures(data: WeatherInfoDTO[]): WeatherInfoDTO {
        const mins: number[] = [];
        const max: number[] = [];
        const temp: number[] = [];
        const weatherInfoDto: WeatherInfoDTO = {} as any;
        const middle = Math.ceil(data.length / 2);
        data.forEach((item: WeatherInfoDTO, index: number) => {
            mins.push(item.min);
            max.push(item.max);
            temp.push(item.avg);

            if (index === middle) {
                weatherInfoDto.icon = item.icon;
                weatherInfoDto.time = item.time;
                weatherInfoDto.description = item.description;
            }
        });
        weatherInfoDto.min = this.calcAvg(mins);
        weatherInfoDto.max = this.calcAvg(max);
        weatherInfoDto.avg = this.calcAvg(temp);

        return weatherInfoDto;
    }

    private isToday(dateStr: string): boolean {
        const date = new Date(dateStr);
        const today = new Date();
        return today.getDate() === date.getDate();
    }

    private getClosestWetherInfo(data: WeatherInfoDTO[]): WeatherInfoDTO {
        let hoursSegments = [0, 3, 6, 9, 12, 15, 18, 21];
        if (hoursSegments.length !== data.length) {
            hoursSegments = hoursSegments.slice(hoursSegments.length - data.length);
        }
        const now = new Date().getHours();
        const closestHour = this.getClosestHour(hoursSegments, now);
        return data[hoursSegments.indexOf(closestHour)];
    }

    private calcAvg(data: number[]) {
        const sum = data.reduce((a, b) => a + b, 0);
        const avg = sum / data.length || 0;
        return avg;
    }

    private getClosestHour(hours: number[], goal: number): number {
        return hours.reduce((prev, curr) => {
            return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
        });
    }
}
