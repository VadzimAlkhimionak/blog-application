package com.blog.services.impl;

import com.blog.models.Post;
import com.blog.models.User;
import com.blog.repositories.CommentRepository;
import com.blog.repositories.PostRepository;
import com.blog.repositories.PostStatusRepository;
import com.blog.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    PostStatusRepository postStatusRepository;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public void deletePost(Post post) {
        postRepository.delete(post);
    }

    @Override
    public Post getPost(int id) {
        return postRepository.findById(id).get();
    }

    @Override
    public void create(Post post, User author) {
        post.setAuthor(author);
        postRepository.saveAndFlush(post);
    }
}
