package com.example.securingweb;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SB400SecuringWebApplicationTests {

	@Autowired
	private WebTestClient webTestClient;

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
	void accessSecuredResourceAuthenticatedThenOk() {
		webTestClient.get().uri("/hello")
				.exchange()
				.expectStatus().is3xxRedirection();
				//.expectBody(String.class)
				//.value(body -> {
				//	assert body.contains("Hello user!");
				//});
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
}
