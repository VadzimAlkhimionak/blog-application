package com.blog.services;

import com.blog.models.Comment;
import com.blog.models.User;

public interface CommentService {
    void add(Comment comment, int postId, User user);
    void delete(int id);
}