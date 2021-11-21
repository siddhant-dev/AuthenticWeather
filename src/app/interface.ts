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

export interface Description {
    className: string;
    message: string;
    part1: string;
    keyword:string;
    part2: string;
    textClass: string;
    subMessage: string;
}