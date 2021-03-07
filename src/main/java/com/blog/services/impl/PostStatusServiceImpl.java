package com.blog.services.impl;

import com.blog.models.Post;
import com.blog.models.PostStatus;
import com.blog.models.User;
import com.blog.repositories.PostRepository;
import com.blog.repositories.PostStatusRepository;
import com.blog.services.PostStatusService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PostStatusServiceImpl implements PostStatusService {

    @Autowired
    PostStatusRepository postStatusRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @Override
    public void setStatus(PostStatus postStatus, User user, int postId) {
        Post post = postRepository.findById(postId).get();

        postStatus.setIdpost(post);
        postStatus.setUser(user);

        postStatusRepository.save(postStatus);
    }

    @Override
    public Map<String, Object> checkStatus(User reader, int postId) {
        Post post = postRepository.findById(postId).get();
        Map<String, Object> response = new HashMap<>();

        for (PostStatus postStatus : post.getPostStatuses()) {
            if (postStatus.getUser().equals(reader)) {
                response.put("id", postStatus.getId());
                response.put("status", postStatus.getStatus());
            }
        }

        return response;
    }
}
