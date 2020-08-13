import {
    WeatherState,
    WeatherAction,
    GET_WEATHER,
    SET_LOADING,
    SET_ERROR,
    SET_FORECAST_ACTIVE,
    SET_PAGE_INDEX,
    SWITCH_UNITS,
} from '../../domain/types';
import { TemperatureUnit } from '../../domain/enums/temperature-unit.enum';

const initialState: WeatherState = {
    data: null,
    currentForecast: null,
    loading: false,
    error: '',
    pageIndex: 0,
    units: TemperatureUnit.Imperial,
};

export default (state = initialState, action: WeatherAction): WeatherState => {
    switch (action.type) {
        case GET_WEATHER:
            return {
                data: action.payload,
                currentForecast: action.payload.length ? action.payload[0] : null,
                loading: false,
                error: '',
                pageIndex: 0,
                units: TemperatureUnit.Imperial,
            };
        case SET_FORECAST_ACTIVE:
            return {
                ...state,
                currentForecast: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case SET_PAGE_INDEX:
            return {
                ...state,
                pageIndex: action.payload,
            };
        case SWITCH_UNITS:
            return {
                ...state,
                units: action.payload,
            };
        default:
            return state;
    }
};
