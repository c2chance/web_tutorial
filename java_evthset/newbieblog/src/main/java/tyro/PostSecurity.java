package tyro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class PostSecurity {
    
    @Autowired
    private PostRepository postRepository;

    public boolean isPostAuthor(Long postId, Authentication authentication) {
        Post post = postRepository.findById(postId).orElse(null);
        return post != null && post.getAuthor().equals(authentication.getName());
    }

}
