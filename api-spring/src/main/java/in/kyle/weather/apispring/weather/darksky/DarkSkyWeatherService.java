package in.kyle.weather.apispring.weather.darksky;

import in.kyle.weather.apispring.weather.Coordinate;
import in.kyle.weather.apispring.weather.WeatherData;
import in.kyle.weather.apispring.weather.WeatherDataBuilder;
import in.kyle.weather.apispring.weather.WeatherService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import tk.plogitech.darksky.api.jackson.DarkSkyJacksonClient;
import tk.plogitech.darksky.forecast.*;
import tk.plogitech.darksky.forecast.model.*;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class DarkSkyWeatherService implements WeatherService {

    private final DarkSkyJacksonClient client = new DarkSkyJacksonClient();
    private final DarkSkyProperties properties;

    @Override
    @SneakyThrows
    public WeatherData getForecast(Coordinate coordinate) {
        ForecastRequest request = new ForecastRequestBuilder()
                .key(new APIKey(properties.getKey()))
                .time(Instant.now())
                .language(ForecastRequestBuilder.Language.en)
                .units(ForecastRequestBuilder.Units.us)
                .extendHourly()
                .location(coordinatesToGeoCoordinates(coordinate))
                .build();
        tk.plogitech.darksky.forecast.model.Forecast forecast = client.forecast(request);
        return createWeatherData(forecast);
    }

    private GeoCoordinates coordinatesToGeoCoordinates(Coordinate coordinate){
        Longitude longitude = new Longitude(coordinate.getLongitude());
        Latitude latitude = new Latitude(coordinate.getLatitude());
        return new GeoCoordinates(longitude, latitude);
    }

    private WeatherData createWeatherData(tk.plogitech.darksky.forecast.model.Forecast forecast){
        DailyDataPoint today = forecast.getDaily().getData().get(0);
        Currently currently = forecast.getCurrently();
        return new WeatherDataBuilder()
                .temperature(currently.getTemperature())
                .apparentTemperature(currently.getApparentTemperature())
                .precipitation(today.getPrecipProbability())
                .high(today.getTemperatureHigh())
                .low(today.getTemperatureLow())
                .humidity(today.getHumidity())
                .outside(currently.getSummary())
                .build();
    }
}
