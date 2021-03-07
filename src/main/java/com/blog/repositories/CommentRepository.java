package com.blog.repositories;

import com.blog.models.Comment;
import com.blog.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    Page<Comment> findByIdpost(Post idpost, Pageable pageable);
}
