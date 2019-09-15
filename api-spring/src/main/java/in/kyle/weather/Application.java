package in.kyle.weather;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.PropertySource;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
@EnableConfigurationProperties
@PropertySource("classpath:config.properties")
public class Application {
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
        log.info("Started");
    }
}
