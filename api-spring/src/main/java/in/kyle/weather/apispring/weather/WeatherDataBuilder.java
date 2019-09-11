package in.kyle.weather.apispring.weather;

import java.util.HashMap;
import java.util.Map;

public class WeatherDataBuilder {

    private final Map<WeatherDataType, Object> map = new HashMap<>();

    public WeatherDataBuilder temperature(double currentTemp){
        return with(WeatherDataType.CURRENT_TEMPERATURE, currentTemp);
    }

    public WeatherDataBuilder precipitation(double chance){
        return with(WeatherDataType.PRECIPITATION_CHANCE, chance);
    }

    public WeatherDataBuilder high(double high){
        return with(WeatherDataType.DAILY_HIGH_TEMPERATURE, high);
    }

    public WeatherDataBuilder low(double low){
        return with(WeatherDataType.DAILY_LOW_TEMPERATURE, low);
    }

    public WeatherDataBuilder humidity(double humidity){
        return with(WeatherDataType.HUMIDITY, humidity);
    }

    public WeatherDataBuilder outside(String outsideStatus){
        return with(WeatherDataType.OUTSIDE_STATUS, outsideStatus);
    }

    public WeatherDataBuilder apparentTemperature(double feelsLikeOutsideTemp){
        return with(WeatherDataType.APPARENT_TEMPERATURE, feelsLikeOutsideTemp);
    }

    private WeatherDataBuilder with(WeatherDataType type, Object object){
        map.put(type, object);
        return this;
    }

    public WeatherData build(){
        return new WeatherData(map);
    }
}
