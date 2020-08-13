import { WeatherData } from '../types';

export class WeatherForecastResourceService {
    getWeather(): Promise<WeatherData[]> {
        return new Promise((resolve, reject) => {
            const weatherAPIKey = '75f972b80e26f14fe6c920aa6a85ad57';
            fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=${weatherAPIKey}&cnt=40&units=imperial`)
                .then(res => res.json())
                .then(data => resolve(data.list));
        });
    }
}
