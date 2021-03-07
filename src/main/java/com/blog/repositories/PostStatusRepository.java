package com.blog.repositories;

import com.blog.models.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostStatusRepository extends JpaRepository<PostStatus, Integer> {
}
