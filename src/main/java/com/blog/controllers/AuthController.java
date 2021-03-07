package com.blog.controllers;

import com.blog.models.User;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {
    @Autowired
    UserService userService;

    @Autowired
    BCryptPasswordEncoder encoder;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody User credentials) {
        String credEmail = credentials.getEmail();
        String credPassword = credentials.getPassword();

        User dbUser = userService.findByEmail(credEmail);
        String dbPassword = dbUser.getPassword();

        if (encoder.matches(credPassword, dbPassword)) {
            return new ResponseEntity<>(dbUser.getRoles().get(0).getRolename(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping(value = "/registration")
    public ResponseEntity<?> registration(@RequestBody User user) {
        userService.create(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}