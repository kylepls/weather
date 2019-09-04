package in.kyle.weather.apispring.weather.darksky;

import lombok.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;

@ConfigurationProperties(prefix = "darksky")
@Value
@Validated
public class DarkSkyProperties {

    @NotEmpty String key;

}
