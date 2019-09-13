package in.kyle.weather.apispring.weather.darksky;

import in.kyle.weather.apispring.weather.Coordinate;
import in.kyle.weather.apispring.weather.WeatherData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EE_DarkSkyWeather {

    @Autowired
    DarkSkyWeather weather;

    @Test
    void getForecast() {
        Coordinate coordinate = new Coordinate(38.6160, 76.6130);
        WeatherData forecast = weather.getForecast(coordinate);
    }
}