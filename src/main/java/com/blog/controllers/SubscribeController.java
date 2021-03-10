package com.blog.controllers;

import com.blog.models.User;
import com.blog.services.SubscribeService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
public class SubscribeController {
    @Autowired
    SubscribeService subscribeService;

    @Autowired
    UserService userService;

    @PostMapping(value = "/subscribe")
    public ResponseEntity<?> subscribe(Principal principal, @RequestBody User author) {
        User reader = userService.findByEmail(principal.getName());
        subscribeService.subscribe(author.getId(), reader.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/{authorId}/unsubscribe")
    public ResponseEntity<?> unsubscribe(Principal principal, @PathVariable int authorId) {
        User reader = userService.findByEmail(principal.getName());
        subscribeService.unsubscribe(reader, authorId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/{authorId}/check-subscribe")
    public boolean checkSubscribe(Principal principal, @PathVariable int authorId) {
        User reader = userService.findByEmail(principal.getName());
        return subscribeService.checkSubscribe(reader, authorId);
    }
}
