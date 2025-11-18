package com.ideen.cardatahouse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI carDataHouseOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                    .title("CarShoppe REST API").description("My car stock").version("0.1"));
    }
}
