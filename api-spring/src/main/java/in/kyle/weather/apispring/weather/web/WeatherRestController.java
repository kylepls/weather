package in.kyle.weather.apispring.weather.web;

import in.kyle.weather.apispring.weather.Forecast;
import in.kyle.weather.apispring.weather.Weather;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class WeatherRestController {

    private final Weather weather;

    @GetMapping("/weather/forecast")
    public Forecast getForecast(@RequestParam String zipCode){
        return weather.getForecast(zipCode);
    }
}
