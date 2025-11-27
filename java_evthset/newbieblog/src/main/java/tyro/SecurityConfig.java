package tyro;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private UserRepsitory userRepsitory;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepsitory.findByUsername(username);

            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }

            return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                        user.getPassword(),
                                user.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority("ROLE_"+role.getName()))
                                .collect(Collectors.toList())
            );
        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/h2 - console/**").permitAll()
            .anyRequest().authenticated()
        )
        .formLogin(formLogin -> 
            formLogin.defaultSuccessUrl("/api/posts", true)
            .permitAll()
        )
        .logout(logout -> logout.permitAll()));


        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }
    
}
