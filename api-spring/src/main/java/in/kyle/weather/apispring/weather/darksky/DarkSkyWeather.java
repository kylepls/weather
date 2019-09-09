package in.kyle.weather.apispring.weather.darksky;

import in.kyle.weather.apispring.weather.Coordinate;
import in.kyle.weather.apispring.weather.Forecast;
import in.kyle.weather.apispring.weather.TemperatureData;
import in.kyle.weather.apispring.weather.Weather;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import tk.plogitech.darksky.api.jackson.DarkSkyJacksonClient;
import tk.plogitech.darksky.forecast.*;
import tk.plogitech.darksky.forecast.model.*;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class DarkSkyWeather implements Weather  {

    private final DarkSkyJacksonClient client = new DarkSkyJacksonClient();
    private final DarkSkyProperties properties;

    @Override
    @SneakyThrows
    public Forecast getForecast(Coordinate coordinate) {
        ForecastRequest request = new ForecastRequestBuilder()
                .key(new APIKey(properties.getKey()))
                .time(Instant.now())
                .language(ForecastRequestBuilder.Language.en)
                .units(ForecastRequestBuilder.Units.us)
                .extendHourly()
                .location(coordinatesToGeoCoordinates(coordinate))
                .build();
        tk.plogitech.darksky.forecast.model.Forecast forecast = client.forecast(request);
        return createSimpleForecast(forecast);
    }

    private GeoCoordinates coordinatesToGeoCoordinates(Coordinate coordinate){
        Longitude longitude = new Longitude(coordinate.getLongitude());
        Latitude latitude = new Latitude(coordinate.getLatitude());
        return new GeoCoordinates(longitude, latitude);
    }

    private Forecast createSimpleForecast(tk.plogitech.darksky.forecast.model.Forecast forecast){
        DailyDataPoint today = forecast.getDaily().getData().get(0);
        TemperatureData temperatureData = createTemperatureData(forecast);
        double rainChance = today.getPrecipProbability();
        String status = today.getSummary();
        return new Forecast(temperatureData, rainChance, status);
    }

    private TemperatureData createTemperatureData(tk.plogitech.darksky.forecast.model.Forecast forecast){
        DailyDataPoint today = forecast.getDaily().getData().get(0);
        Currently currently = forecast.getCurrently();
        double currentTemp = currently.getTemperature();
        return new TemperatureData(currentTemp, today.getTemperatureLow(), today.getTemperatureHigh());
    }
}
