export interface CurrentWeather{
    temp: number;
    humidity: number;
    main: string;
    description: string;
    wind: {
        speed: number;
        deg: number;
    }
    cityName: string;
    forcast: Array<any>;
}