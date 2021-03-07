package com.blog.repositories;

import com.blog.models.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface SubscribeRepository extends JpaRepository<Subscribe, Integer> {
}
