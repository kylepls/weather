package in.kyle.weather.apispring.weather.darksky;

import in.kyle.weather.apispring.weather.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import tk.plogitech.darksky.api.jackson.DarkSkyJacksonClient;
import tk.plogitech.darksky.forecast.*;
import tk.plogitech.darksky.forecast.model.*;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class DarkSkyWeather implements Weather {

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
        var forecast = client.forecast(request);
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
        return new WeatherData(CurrentData.builder()
                .temperature(createStatus(currently, today))
                .humidity(currently.getHumidity())
                .outsideStatus(today.getSummary())
                .precipitationChance(today.getPrecipProbability())
                .build());
    }

    private TemperatureStatus createStatus(Currently currently, DailyDataPoint dataPoint){
        return TemperatureStatus.builder()
                .apparent(currently.getApparentTemperature())
                .current(currently.getTemperature())
                .high(dataPoint.getTemperatureHigh())
                .low(dataPoint.getTemperatureLow())
                .build();
    }
}
