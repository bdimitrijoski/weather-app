import { JsonConverter, JsonCustomConvert } from 'json2typescript';

@JsonConverter
export class DateDataMapper implements JsonCustomConvert<string> {
    serialize(value: string): string {
        return value;
    }

    deserialize(value: string): string {
        const options = { weekday: 'short', day: 'numeric' };
        const date = new Date(value);

        if (this.isToday(date)) {
            return 'Today';
        }
        if (this.isTomorrow(date)) {
            return 'Tomorrow';
        }
        return date
            .toLocaleDateString('en-US', options)
            .split(' ')
            .reverse()
            .join(' ');
    }

    private isToday(date: Date): boolean {
        const today = new Date();
        return today.getDate() === date.getDate();
    }

    private isTomorrow(date: Date): boolean {
        const today = new Date();
        return today.getDate() + 1 === date.getDate();
    }
}
