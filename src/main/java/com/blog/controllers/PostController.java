package com.blog.controllers;

import com.blog.models.Post;
import com.blog.models.User;
import com.blog.repositories.PostRepository;
import com.blog.services.PostService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PostController {
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @PutMapping(value = "/posts/{id}/update")
    public ResponseEntity<?> update(@RequestBody Post post, @PathVariable int id) {
        Post dbPost = postService.getPost(id);
        dbPost.setDescription(post.getDescription());
        dbPost.setTitle(post.getTitle());
        dbPost.setIdpost(id);
        postRepository.save(dbPost);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/posts/{id}")
    public Post getPost(@PathVariable int id) {
        return postService.getPost(id);
    }

    @DeleteMapping(value = "/posts/{id}/delete")
    public ResponseEntity<?> delete(@PathVariable int id) {
        System.out.println("id: " + id);
        Post post = postService.getPost(id);
        postService.deletePost(post);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/pagination-posts")
    public ResponseEntity<Map<String, Object>> getPosts(
            @RequestParam(value = "page") int page,
            @RequestParam(value = "size") int size,
            @RequestParam(value = "id") int authorId
    ) {
        try {
            User author = userService.getUser(authorId);
            List<Post> posts;
            Pageable paging = PageRequest.of(page, size);

            Page<Post> pagePosts;
            if (author == null) {
                pagePosts = postRepository.findAll(paging);
            } else {
                pagePosts = postRepository.findByAuthor(author, paging);
            }

            posts = pagePosts.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("posts", posts);
            response.put("currentPage", pagePosts.getNumber());
            response.put("totalItems", pagePosts.getTotalElements());
            response.put("totalPages", pagePosts.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
