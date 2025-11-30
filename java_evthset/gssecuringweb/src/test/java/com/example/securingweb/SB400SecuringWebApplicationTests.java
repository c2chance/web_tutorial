package com.example.securingweb;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.reactive.server.SecurityMockServerConfigurers;
import org.springframework.test.web.reactive.server.WebTestClient;

@Disabled("Temporarily disabled")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SB400SecuringWebApplicationTests {

	@Autowired
	private WebTestClient webTestClient;

	@Autowired 
	private ApplicationContext context;

	@BeforeEach
	void setup() {
		webTestClient = WebTestClient.bindToApplicationContext(context)
			.apply(SecurityMockServerConfigurers.springSecurity())
			.configureClient()
			.build();
	}

	//private WebTestClient webTestClient = WebTestClient.bindToServer()
	//		.baseUrl("http://localhost:8080").build();
	
			
    @Test
    void accessUnsecuredResourceThenOk() {
        webTestClient.get().uri("/")
                .exchange()
                .expectStatus().isOk();
    }

@Test
void accessSecuredResourceUnauthenticatedThenRedirectsToLogin() {
    webTestClient.get().uri("/hello")
            .exchange()
            .expectStatus().is3xxRedirection();
            //.expectHeader().valueMatches("Location", ".*\\/login$");
}


    @Test
    @WithMockUser(username = "user", roles = "USER")
/*	//@WithMockUser(username = "user", password = "password", roles = "USER")
	void accessSecuredResourceAuthenticatedThenOk() {
		webTestClient.get().uri("/hello")
				.exchange()
				.expectStatus().isOk()
				.expectBody(String.class)
				.consumeWith(response -> {
					String body = response.getResponseBody();
					assert body != null : "Response body should not be null";
					assert body.contains("Hello user!");
				});
	}
	*/
	void accessSecuredResourceAuthenticatedThenOk() {
		webTestClient.get().uri("/hello")
			.exchange()
			.expectStatus().isOk()
			.expectBody(String.class)
			.value(body->
				assertThat(body).contains("Hello user!!")
			);
	}
/*
@Test
void accessSecuredResourceUnauthenticatedThenRedirects() {
    webTestClient
            .get().uri("/hello")
            .exchange()
            .expectStatus().is3xxRedirection()
            .expectHeader().valueMatches("Location", ".*\\/login");
}

	@Test
	void loginWithValidUserThenAuthenticated() {
		webTestClient.post().uri("/login")
				.bodyValue("username=user&password=password")
				.header("Content-Type", "application/x-www-form-urlencoded")
				.exchange()
				.expectStatus().is3xxRedirection();
				//.expectHeader().valueMatches("Location", ".*\\/");
	}
	
    @Test
    void loginWithInvalidUserThenUnauthenticated() {
        webTestClient.post().uri("/login")
                .bodyValue("username=invalid&password=wrong")
                .header("Content-Type", "application/x-www-form-urlencoded")
                .exchange()
                .expectStatus().is3xxRedirection();
                //.expectHeader().valueMatches("Location", ".*\\/login\\?error$");
    }
	*/
}
