package com.blog.services.impl;

import com.blog.models.Role;
import com.blog.models.Subscribe;
import com.blog.models.User;
import com.blog.repositories.UserRepository;
import com.blog.services.RoleService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public void create(User user) {
        List<Role> roles = user.getRoles().stream()
                .map(role -> roleService.getByRole(role.getRolename()))
                .collect(Collectors.toList());

        roles.forEach(role -> role.getUsers().add(user));
        user.setRoles(roles);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.saveAndFlush(user);
    }

    @Override
    public User getUser(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getByRole(String role) {
        Role byRole = roleService.getByRole(role);
        return byRole.getUsers();
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getFavoriteAuthors(String email) {
        List<User> authors = roleService.getByRole("author").getUsers();
        List<User> authorsFavorite = new ArrayList<>();

        for (User author : authors) {
            for (Subscribe subscribe : author.getSubscribes()) {
                if (subscribe.getSubscriber().getEmail().equals(email)) {
                    authorsFavorite.add(author);
                }
            }
        }

        return authorsFavorite;
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findUserByEmail(email).get();
    }
}
