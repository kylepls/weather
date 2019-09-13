package in.kyle.weather.apispring.weather.web;

import in.kyle.weather.apispring.weather.Coordinate;
import in.kyle.weather.apispring.weather.WeatherData;
import in.kyle.weather.apispring.weather.Weather;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("weather")
@AllArgsConstructor
public class WeatherRestController {

    private final Weather weather;

    @GetMapping("/forecast")
    public WeatherData getForecast(@RequestParam("lng") double longitude, @RequestParam("lat") double latitude){
        return weather.getForecast(new Coordinate(longitude, latitude));
    }
}
