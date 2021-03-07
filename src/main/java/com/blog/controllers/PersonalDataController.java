package com.blog.controllers;

import com.blog.models.User;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PersonalDataController {
    @Autowired
    UserService userService;

    @GetMapping(value = "/personal-data")
    public User personalData(Principal principal) {
        return userService.findByEmail(principal.getName());
    }

    @PutMapping(value = "/personal-data/update")
    public ResponseEntity<?> update(@RequestBody User user) {
        userService.update(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
