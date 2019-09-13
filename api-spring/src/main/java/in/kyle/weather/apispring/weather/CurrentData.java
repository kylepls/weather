package in.kyle.weather.apispring.weather;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CurrentData {

    TemperatureStatus temperature;
    double humidity;
    double precipitationChance;
    String outsideStatus;

}
