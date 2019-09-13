package in.kyle.weather.apispring.weather;

public interface Weather {

    WeatherData getForecast(Coordinate coordinate);

}
