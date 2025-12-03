package com.ideen.reactrouter;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ReactrouterApplicationTests {

	@Autowired
	private WebTestClient client;

	@Test
	public void test_home_page() {

		client.get().uri("/").exchange().expectStatus().isOk()
				.expectBody(String.class).isEqualTo("Home page");
	}

	@Test
	public void test_about_page() {

		client.get().uri("/about").exchange().expectStatus().isOk()
			.expectBody(String.class).isEqualTo("About page");
	}

	@Disabled("Not needed now")
	@Test
	void contextLoads() {
	}

}
