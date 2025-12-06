package tyro;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/posts")
//@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostSecurity postSecurity;

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_USER') or hasAuthority('ROLE_ADMIN')")
    public Post createPost(@RequestBody Post post, Authentication authentication) {
        post.setAuthor(authentication.getName());
        //

        return postRepository.save(post);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or (hasAuthority('ROLE_USER') and @postSecurity.isPostAuthor(#id, authentication))")
    public Post updatePost(@PathVariable Long id, @RequestBody Post updatedPost, Authentication authentication) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + id));
        
        if (!postSecurity.isPostAuthor(id, authentication)) {
            throw new IllegalArgumentException("You are not the author of this post");
        }

        post.setTitle(updatedPost.getTitle());
        post.setContent(updatedPost.getContent());
        return postRepository.save(post);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or (hasAuthority('ROLE_USER') and @postSecurity.isPostAuthor(#id, authentication))")
    public String deletePost(@PathVariable Long id, Authentication authentication) {
        Post post = postRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Post not found with id: "+id));

        if (!postSecurity.isPostAuthor(id, authentication)) {
            throw new IllegalArgumentException("You are not the author of this post");
        }

        postRepository.delete(post);
        return "Post deleted successfully";
        
    }

}