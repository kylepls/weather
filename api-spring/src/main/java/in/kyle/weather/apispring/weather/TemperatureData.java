package in.kyle.weather.apispring.weather;

import lombok.Value;

@Value
public class TemperatureData {

    double currentTemperature;
    double lowTemperature;
    double highTemperature;

}
