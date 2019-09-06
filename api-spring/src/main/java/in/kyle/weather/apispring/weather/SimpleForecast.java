package in.kyle.weather.apispring.weather;

import lombok.Value;

@Value
public class SimpleForecast {

    TemperatureData temperatureData;
    double precipitationChance;
    String outsideStatus;

}
