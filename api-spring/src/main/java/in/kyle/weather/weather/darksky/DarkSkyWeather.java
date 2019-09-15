package in.kyle.weather.weather.darksky;

import org.springframework.stereotype.Service;

import java.time.Instant;

import in.kyle.weather.weather.model.Coordinate;
import in.kyle.weather.weather.model.DataPoint;
import in.kyle.weather.weather.model.Temperature;
import in.kyle.weather.weather.Weather;
import in.kyle.weather.weather.model.WeatherReport;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import tk.plogitech.darksky.api.jackson.DarkSkyJacksonClient;
import tk.plogitech.darksky.forecast.ForecastRequest;
import tk.plogitech.darksky.forecast.ForecastRequestBuilder;
import tk.plogitech.darksky.forecast.GeoCoordinates;
import tk.plogitech.darksky.forecast.model.Currently;
import tk.plogitech.darksky.forecast.model.DailyDataPoint;
import tk.plogitech.darksky.forecast.model.Latitude;
import tk.plogitech.darksky.forecast.model.Longitude;

@Service
@RequiredArgsConstructor
public class DarkSkyWeather implements Weather {
    
    private final DarkSkyJacksonClient client = new DarkSkyJacksonClient();
    private final DarkSkyProperties properties;
    
    @Override
    @SneakyThrows
    public WeatherReport getForecast(Coordinate coordinate) {
        var units = ForecastRequestBuilder.Units.us;
        var language = ForecastRequestBuilder.Language.en;
        ForecastRequest request = new ForecastRequestBuilder().key(properties.getKey())
                .time(Instant.now())
                .language(language)
                .units(units)
                .extendHourly()
                .location(toGeoCoordinates(coordinate))
                .build();
        var forecast = client.forecast(request);
        return makeWeatherData(forecast);
    }
    
    private GeoCoordinates toGeoCoordinates(Coordinate coordinate) {
        Longitude longitude = new Longitude(coordinate.getLongitude());
        Latitude latitude = new Latitude(coordinate.getLatitude());
        return new GeoCoordinates(longitude, latitude);
    }
    
    private WeatherReport makeWeatherData(tk.plogitech.darksky.forecast.model.Forecast forecast) {
        DailyDataPoint today = forecast.getDaily().getData().get(0);
        Currently currently = forecast.getCurrently();
        return new WeatherReport(DataPoint.builder()
                                       .temperature(makeStatus(currently, today))
                                       .humidity(currently.getHumidity())
                                       .report(today.getSummary())
                                       .precipitationChance(today.getPrecipProbability())
                                       .build());
    }
    
    private Temperature makeStatus(Currently currently, DailyDataPoint dataPoint) {
        return Temperature.builder()
                .apparent(currently.getApparentTemperature())
                .current(currently.getTemperature())
                .high(dataPoint.getTemperatureHigh())
                .low(dataPoint.getTemperatureLow())
                .build();
    }
}
