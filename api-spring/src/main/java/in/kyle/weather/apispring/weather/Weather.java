package in.kyle.weather.apispring.weather;

public interface Weather {

    SimpleForecast getForecast(Coordinate coordinate);

}
