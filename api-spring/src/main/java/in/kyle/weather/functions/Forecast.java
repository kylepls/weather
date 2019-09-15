package in.kyle.weather.functions;

import org.springframework.stereotype.Component;

import java.util.function.Function;

import in.kyle.weather.weather.Weather;
import in.kyle.weather.weather.model.Coordinate;
import in.kyle.weather.weather.model.WeatherReport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
class Forecast implements Function<Coordinate, WeatherReport> {
    
    private final Weather weather;
    
    @Override
    public WeatherReport apply(Coordinate coordinate) {
        log.info("Getting forecast for {}", coordinate);
        WeatherReport forecast = weather.getForecast(coordinate);
        log.info("Got forecast: {}", forecast);
        return forecast;
    }
}
