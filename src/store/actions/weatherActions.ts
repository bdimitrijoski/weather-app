import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { WeatherForecastService } from '../../domain/services/weather-forecast.service';
import { GET_WEATHER, SET_ERROR, SET_LOADING, WeatherAction, SET_FORECAST_ACTIVE, SET_PAGE_INDEX, SWITCH_UNITS } from '../../domain/types';
import { WeatherForecast } from '../../domain/models/weather-forecast.model';
import { TemperatureUnit } from '../../domain/enums/temperature-unit.enum';

export const getWeather = (): ThunkAction<void, RootState, null, WeatherAction> => {
    return async dispatch => {
        try {
            const service = new WeatherForecastService();
            const resData = await service.getWeather();
            dispatch({
                type: GET_WEATHER,
                payload: resData,
            });
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err.message,
            });
        }
    };
};

export const setForecastActive = (weatherForecast: WeatherForecast): WeatherAction => {
    return {
        type: SET_FORECAST_ACTIVE,
        payload: weatherForecast,
    };
};

export const setLoading = (): WeatherAction => {
    return {
        type: SET_LOADING,
    };
};

export const setPageIndex = (pageIndex: number): WeatherAction => {
    return {
        type: SET_PAGE_INDEX,
        payload: pageIndex,
    };
};

export const switchUnits = (type: TemperatureUnit): WeatherAction => {
    return {
        type: SWITCH_UNITS,
        payload: type,
    };
};

export const setError = (): WeatherAction => {
    return {
        type: SET_ERROR,
        payload: '',
    };
};
