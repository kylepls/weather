package in.kyle.weather.apispring.weather;

public interface Weather {

    Forecast getForecast(Coordinate coordinate);

}
