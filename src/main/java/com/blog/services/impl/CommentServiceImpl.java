package com.blog.services.impl;

import com.blog.models.Comment;
import com.blog.models.Post;
import com.blog.models.User;
import com.blog.repositories.CommentRepository;
import com.blog.repositories.PostRepository;
import com.blog.services.CommentService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserService userService;

    @Autowired
    PostRepository postRepository;

    @Override
    public void add(Comment comment, int postId, User user) {
        Post post = postRepository.findById(postId).get();

        comment.setUser(user);
        comment.setIdpost(post);

        commentRepository.save(comment);
    }

    @Override
    public void delete(int id) {
        Comment comment = commentRepository.findById(id).get();
        commentRepository.delete(comment);
    }
}
