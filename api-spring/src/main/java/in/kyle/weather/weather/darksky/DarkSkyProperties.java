package in.kyle.weather.weather.darksky;

import lombok.Data;
import tk.plogitech.darksky.forecast.APIKey;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotEmpty;

@ConfigurationProperties(prefix = "darksky")
@Data
@Validated
class DarkSkyProperties {

    @NotEmpty private final String key;
    
    public APIKey getKey() {
        return new APIKey(key);
    }

}
