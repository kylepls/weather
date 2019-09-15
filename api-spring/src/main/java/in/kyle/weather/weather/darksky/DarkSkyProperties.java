package in.kyle.weather.weather.darksky;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;
import tk.plogitech.darksky.forecast.APIKey;

@ConfigurationProperties(prefix = "darksky")
@Data
class DarkSkyProperties {
    
    private final String key;
    
    public APIKey getKey() {
        return new APIKey(key);
    }
}
