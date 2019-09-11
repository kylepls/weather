package in.kyle.weather.apispring.weather;

public interface WeatherService {

    WeatherData getForecast(Coordinate coordinate);

}
