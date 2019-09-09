package in.kyle.weather.apispring.weather;

import lombok.Value;

@Value
public class Forecast {

    TemperatureData temperatureData;
    double precipitationChance;
    String outsideStatus;

}
