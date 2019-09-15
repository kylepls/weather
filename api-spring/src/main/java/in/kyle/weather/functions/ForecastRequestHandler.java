package in.kyle.weather.functions;

import org.springframework.cloud.function.adapter.aws.SpringBootRequestHandler;

import in.kyle.weather.weather.model.Coordinate;

public class ForecastRequestHandler extends SpringBootRequestHandler<Coordinate, Forecast> {
}
