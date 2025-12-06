package tyro;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;


@Configuration
public class DataInitializer {
    
    @Bean
    @Transactional
    public CommandLineRunner initRolesAndUsers(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (roleRepository.findByName("USER") == null) {
                Role userRole = new Role();
                userRole.setName("USER");
                roleRepository.save(userRole);
            }

            if (roleRepository.findByName("ADMIN") == null) {
                Role adminRole = new Role();
                adminRole.setName("ADMIN");
                roleRepository.save(adminRole);
            }

            if (userRepository.findByUsername("user") == null) {
                User user = new User();
                user.setUsername("user");
                user.setPassword(passwordEncoder.encode("password"));

                Role userRole = roleRepository.findByName("USER");
                Set<Role> roles = new HashSet<>();
                roles.add(userRole);
                user.setRoles(roles);

                userRepository.save(user);
            }

            if (userRepository.findByUsername("admin") == null) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("password"));

                Role adminRole = roleRepository.findByName("ADMIN");
                Set<Role> roles = new HashSet<>();
                roles.add(adminRole);
                admin.setRoles(roles);

                userRepository.save(admin);
            }

        };
    }
}
