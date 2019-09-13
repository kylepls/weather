package in.kyle.weather.apispring.weather;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class TemperatureStatus {

    double current;
    double apparent;
    double high;
    double low;

}
