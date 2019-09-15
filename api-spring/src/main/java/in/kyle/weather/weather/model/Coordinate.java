package in.kyle.weather.weather.model;

import lombok.NoArgsConstructor;
import lombok.Value;

@NoArgsConstructor(force = true)
@Value
public class Coordinate {
    
    double latitude;
    double longitude;

}
