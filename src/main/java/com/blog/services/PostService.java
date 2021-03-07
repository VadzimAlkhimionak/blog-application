package com.blog.services;

import com.blog.models.Post;
import com.blog.models.User;

public interface PostService {
    void deletePost(Post post);
    Post getPost(int id);
    void create(Post post, User author);
}
