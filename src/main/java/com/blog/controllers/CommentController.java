package com.blog.controllers;

import com.blog.models.Comment;
import com.blog.models.Post;
import com.blog.models.User;
import com.blog.repositories.CommentRepository;
import com.blog.services.CommentService;
import com.blog.services.PostService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CommentController {
    @Autowired
    CommentService commentService;

    @Autowired
    UserService userService;

    @Autowired
    PostService postService;

    @Autowired
    CommentRepository commentRepository;

    @PostMapping(value = "/posts/{postId}/comments/add")
    public ResponseEntity<?> add(@RequestBody Comment comment, Principal principal, @PathVariable int postId) {
        User user = userService.findByEmail(principal.getName());
        commentService.add(comment, postId, user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/comments/{id}/delete")
    public ResponseEntity<?> delete(@PathVariable int id) {
        commentService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/comments/{commentId}/update")
    public ResponseEntity<?> update(@RequestBody Comment comment, @PathVariable int commentId) {
        Comment dbComment = commentRepository.findById(commentId).get();
        dbComment.setDescription(comment.getDescription());
        dbComment.setIdcomment(commentId);
        commentRepository.save(dbComment);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/check-author-comment/{commentId}")
    public boolean checkAuthorComment(Principal principal, @PathVariable int commentId) {
        User user = userService.findByEmail(principal.getName());
        Comment comment = commentRepository.findById(commentId).get();
        return user.getId() == comment.getUser().getId();
    }

    @GetMapping(value = "/pagination-comments")
    public ResponseEntity<Map<String, Object>> getComments(
            @RequestParam(value = "page") int page,
            @RequestParam(value = "size") int size,
            @RequestParam(value = "id") int id
    ) {
        try {
            Post post = postService.getPost(id);

            List<Comment> comments;
            Pageable paging = PageRequest.of(page, size);

            Page<Comment> pageComments;
            if (post == null) {
                pageComments = commentRepository.findAll(paging);
            } else {
                pageComments = commentRepository.findByIdpost(post, paging);
            }

            comments = pageComments.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("comments", comments);
            response.put("currentPage", pageComments.getNumber());
            response.put("totalItems", pageComments.getTotalElements());
            response.put("totalPages", pageComments.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}