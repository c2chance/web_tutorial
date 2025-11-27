package example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationResponseType;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.errorprone.annotations.ThreadSafeTypeParameter;
import com.sun.source.tree.AssertTree;

@SpringBootTest(classes = {OAuth2LoginApplication.class, OAuth2LoginApplication.SecurityTestConfig.class})
@AutoConfigureMockMvc
public class OAuth2LoginApplicationTests {

    private static final String AUTHORIZATION_BASE_URI = "oauth2/authorization";

    private static final String AUTHORIZE_BASE_URL = "http://localhost:8080/login/oauth2/code";

    @Autowired
    private WebClient webClient;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @BeforeEach
    void setup() {
        this.webClient.getCookieManager().clearCookies();
    }

    @Test
    void requestIndexPageWhenNotAuthenticatedThenDisplayLoginPage() throws Excception {
        HtmlPage page = this.webClient.getPage("/");
        this.assertLoginPage(page);
    }

    @Test
    void requestOtherPageWhenNotAuthenticatedThenDisplayLoginPage() throws Exception {
        HtmlPage page = this.webClient.getPage("/other-page");
        this.assertLoginPage(page);
    }

    @Test
    void requestAuthorizeGitHubClientWhenLinkClickedThenStatusRedirectForAuthorization() throws Exception {
        HtmlPage page = this.webClient.getPage("/");

        ClientRegistration clientRegistration = this.clientRegistrationRepository.findByRegistrationId("github");

        HtmlAnchor clientAnchorElement this.getClientAnchorElement(page, clientRegistration);
        assertThat(clientAnchorElement).isNotNull();

        WebResponse response = this.followLinkDisableRedirects(clientAnchorElement);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.MOVED_PERMANENTLY.value());

        String authorizeRedirectUri = response.getResponseHeaderValue("Location");
        assertThat(authorizedRedirectUri).isNotNull;

        UriComponents uriComponents = UriComponentsBuilder.fromUri(URI.create(authorizeRedirectUri)).build();

        String requestUri = uriComponents.getScheme() + "://" + uriComponents.getHost() + uriComponents.getPath();
        assertThat(requestUri).isEqualTo(clientRegistration.getProviderDetails().getAuthorizationUri());

        Map<String, String> params = uriComponents.getQueryParams().toSingleValueMap();

        assertThat(params.get(OAuth2ParameterNames.RESPONSE_TYPE))
            .isEqualTo(OAuth2AuthorizationResponseType.CODE.getValue());
        assertThat(params.get(OAuth2ParameterNames.CLIENT_ID)).isEqualTo(clientRegistration.getClientId());
        String redirectUri = AUTHORIZE_BASE_URL + "/" + clientRegistration.getRegistrationId();
        assertThat(URLDecoder.decode(params.get(OAuth2ParameterNames.REDIRECT_URI), "UTF-8")).isEqualTo(redirecturi);
        assertThat(URLDecoder.decode(params.get(OAuth2ParameterNames.SCOPE), "UTF-8"))
            .isEqualTo(clientRegistration.getScopes().stream().collect(Collection.joining(" ")));
        assertThat(params.get(OAuth2ParameterNames.STATE)).isNotNull();
    }

    
}
