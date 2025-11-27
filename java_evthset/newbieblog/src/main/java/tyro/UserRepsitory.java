package tyro;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepsitory extends JpaRepository<User, Long> {

    User findByUsername(String username);
    
}
