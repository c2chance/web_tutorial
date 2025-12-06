package tyro;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAll();

    Optional<Post> findById(Long id);

//    Post save(Post, post);

    void deleteById(Long id);
        
}
