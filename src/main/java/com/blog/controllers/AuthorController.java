package com.blog.controllers;

import com.blog.models.Post;
import com.blog.models.User;
import com.blog.services.PostService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthorController {
    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @GetMapping(value = "/author")
    public User author(Principal principal) {
        return userService.findByEmail(principal.getName());
    }

    @PostMapping(value = "/post")
    public ResponseEntity<?> createPost(Principal principal, @RequestBody Post post) {
        User author = userService.findByEmail(principal.getName());
        postService.create(post, author);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}