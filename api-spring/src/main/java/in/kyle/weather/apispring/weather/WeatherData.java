package in.kyle.weather.apispring.weather;

import lombok.Value;

import java.util.Map;

@Value
public class WeatherData {

    Map<WeatherDataType, Object> data;

}
