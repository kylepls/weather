package in.kyle.weather.weather.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Temperature {

    double current;
    double apparent;
    double high;
    double low;

}
