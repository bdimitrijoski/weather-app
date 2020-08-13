import { WeatherForecast } from '../models/weather-forecast.model';
import { TemperatureUnit } from '../enums/temperature-unit.enum';

export const GET_WEATHER = 'GET_WEATHER';
export const SET_FORECAST_ACTIVE = 'SET_FORECAST_ACTIVE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_ALERT = 'SET_ALERT';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const SWITCH_UNITS = 'SWITCH_UNITS';

export interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface WeatherData {
    clouds: {
        all: number;
    };
    dt: number;
    dt_txt: string;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    sys: {
        pod: string;
    };
    visibility: number;
    pop: number;
    weather: Weather[];
    wind: {
        speed: number;
        deg: number;
    };
}

export interface WeatherError {
    cod: string;
    message: string;
}

export interface WeatherState {
    data: WeatherForecast[] | null;
    currentForecast: WeatherForecast | null;
    loading: boolean;
    error: string;
    pageIndex: number;
    units: TemperatureUnit;
}

interface GetWeatherAction {
    type: typeof GET_WEATHER;
    payload: WeatherForecast[];
}
interface SetForecastActiveAction {
    type: typeof SET_FORECAST_ACTIVE;
    payload: WeatherForecast;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface SwitchUnitsAction {
    type: typeof SWITCH_UNITS;
    payload: TemperatureUnit;
}

interface SetPageIndexAction {
    type: typeof SET_PAGE_INDEX;
    payload: number;
}

export type WeatherAction =
    | GetWeatherAction
    | SetForecastActiveAction
    | SetLoadingAction
    | SetErrorAction
    | SetPageIndexAction
    | SwitchUnitsAction;

export interface AlertAction {
    type: typeof SET_ALERT;
    payload: string;
}

export interface AlertState {
    message: string;
}
