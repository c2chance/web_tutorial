package com.ideen.newbiesecuringweb;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.FormLoginRequestBuilder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
// import org.springframework.test.web.servlet.setup.MockMvcBuilders;

//import org.springframework.context.annotation.Import;
//import org.springframework.boot.test.autoconfigure.web.servlet.MockMvcAutoConfiguration;
//import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.FormLoginRequestBuilder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.unauthenticated;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrlPattern;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class NewbiesecuringwebApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	//@Test
	//void contextLoads() {
	//}
	
	@Test
	public void loginWithValidUserThenAuthenticated() throws Exception {
		FormLoginRequestBuilder login = formLogin()
			.user("user")
			.password("password");

		mockMvc.perform(login)
			.andExpect(authenticated().withUsername("user"));
	
	}
	

	@Test
	public void loginWithInvalidUserThenUnauthenticated() throws Exception {
		FormLoginRequestBuilder login = formLogin()
			.user("invalid")
			.password("invalidpassword");

		mockMvc.perform(login)
			.andExpect(unauthenticated());
	}
	

	@Test
	public void accessUnsecuredResourceThenOk() throws Exception {
		mockMvc.perform(get("/")).andExpect(status().isOk());
	}

	@Test
	public void accessSecuredResourceUnauthenticatedThenRedirectsToLogin() throws Exception {
		mockMvc.perform(get("/hello")).andExpect(status().is3xxRedirection())
			.andExpect(redirectedUrlPattern("**/login"));
	}

	@Test
	@WithMockUser(username="user")
	public void accessSecuredResourceAuthenticatedThenOk() throws Exception {
		MvcResult mvcResult = mockMvc.perform(get("/hello")).andExpect(status().isOk())
				.andReturn();

		assertThat(mvcResult.getResponse().getContentAsString()).contains("Hello user!");
	}
	
}
