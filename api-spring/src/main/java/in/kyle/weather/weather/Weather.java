package in.kyle.weather.weather;

import in.kyle.weather.weather.model.Coordinate;
import in.kyle.weather.weather.model.WeatherReport;

public interface Weather {

    WeatherReport getForecast(Coordinate coordinate);

}
