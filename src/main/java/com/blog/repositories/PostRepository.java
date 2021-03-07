package com.blog.repositories;

import com.blog.models.Post;
import com.blog.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
    Page<Post> findByAuthor(User author, Pageable pageable);
}
