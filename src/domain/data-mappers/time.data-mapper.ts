import { JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class TimeDataMapper implements JsonCustomConvert<string> {
    serialize(value: string): string {
        return value;
    }

    deserialize(value: string): string {
        const hours = +value.split(':')[0];
        if (hours === 0) {
            return '12 am';
        }

        const parsedHours = hours % 12 || 12;
        return hours >= 12 ? `${parsedHours} pm` : `${hours} am`;
    }
}
