package com.ideen.oauth2;

import java.util.Collections;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;

@WebMvcTest(OAuth2LoginController.class)
public class OAuth2LoginControllerTests {

    @Autowired
    MockMvc mvc;

    @Test
    void rootWhenAuthenticatedReturnsUserAndClient() throws Exception {
        //
        this.mvc.perform(get("/").with(oauth2Login()))
            .andExpect(model().attribute("username", "user"))
            .andExpect(model().attribute("clientName", "test"))
            .andExpect(model().attribute("userAttributes", Collections.singletonMap("sub", "user")));
        // @formatter:on
    }

    @Test
    void rootWhenOverridingClientRegistrationReturnsAccordingly() throws Exception {
        // 
        ClientRegistraction ClientRegistraction = ClientRegistration.withRegistrationId("test")
            .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
            .authorizationUri("https://authorization-uri.example.org")
            .clientId("my-client-id")
            .clientName("my-client-name")
            .redirectUri("{baseUrl}/login/oauth2/code/test")
            .tokenUri("https://token-uri.example.org")
            .build();

        this.mvc.perform(get("/").with(oauth2Login()
            .clientRegistration(clientRegistration)
            .attributes((a) -> a.put("sub", "spring-security"))))
            .andExpect(model().attribute("userName", "spring-security"))
            .andExpect(model().attribute("clientName", "my-client-name"))
            .andExpect(model().attribute("userAttributes", Collection.singletonMap("sub", "spring-security")));
        // @formatter:on
    }

    @TestConfiguration
    static class AuthorizedClient {

        @Bean
        OAuth2AuthorizedClientRepository auth2AuthorizedClientRepository() {
            return new HttpSessionOAuth2AuthorizedClientRepository();
        }
    }
    
}
