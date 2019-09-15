package in.kyle.weather.weather.darksky;

import in.kyle.weather.weather.model.Coordinate;
import in.kyle.weather.weather.model.WeatherReport;

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
        WeatherReport forecast = weather.getForecast(coordinate);
    }
}