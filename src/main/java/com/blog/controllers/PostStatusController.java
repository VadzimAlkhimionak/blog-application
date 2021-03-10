package com.blog.controllers;

import com.blog.models.PostStatus;
import com.blog.models.User;
import com.blog.services.PostStatusService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
public class PostStatusController {

    @Autowired
    PostStatusService postStatusService;

    @Autowired
    UserService userService;

    @PutMapping(value = "/{postId}/status")
    public ResponseEntity<?> status(Principal principal, @RequestBody PostStatus postStatus, @PathVariable int postId) {
        User user = userService.findByEmail(principal.getName());
        postStatusService.setStatus(postStatus, user, postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/{postId}/check-status")
    public Map<String, Object> checkStatus(Principal principal, @PathVariable int postId) {
        User reader = userService.findByEmail(principal.getName());
        return postStatusService.checkStatus(reader, postId);
    }
}