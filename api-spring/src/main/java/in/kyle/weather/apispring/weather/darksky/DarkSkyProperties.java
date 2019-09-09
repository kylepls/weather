package in.kyle.weather.apispring.weather.darksky;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;

@ConfigurationProperties(prefix = "darksky")
@Data
@Validated
class DarkSkyProperties {

    @NotEmpty private final String key;

}
