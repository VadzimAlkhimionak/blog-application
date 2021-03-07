package com.blog.services;

import com.blog.models.PostStatus;
import com.blog.models.User;

import java.util.Map;

public interface PostStatusService {
    void setStatus(PostStatus postStatus, User user, int postId);
    Map<String, Object> checkStatus(User reader, int postId);
}
