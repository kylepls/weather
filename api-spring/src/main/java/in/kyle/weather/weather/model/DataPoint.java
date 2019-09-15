package in.kyle.weather.weather.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class DataPoint {

    Temperature temperature;
    double humidity;
    double precipitationChance;
    String report;

}
