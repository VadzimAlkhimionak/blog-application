package com.blog.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer idpost;

    private String title;
    private String description;
    private Date date;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_iduser")
    private User author;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "idpost", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "idpost")
    private List<PostStatus> postStatuses = new ArrayList<>();

    public Post() {}

    public Post(Integer idpost, String title, String description, Date date, User author, List<Comment> comments, List<PostStatus> postStatuses) {
        this.idpost = idpost;
        this.title = title;
        this.description = description;
        this.date = date;
        this.author = author;
        this.comments = comments;
        this.postStatuses = postStatuses;
    }

    public Integer getIdpost() {
        return idpost;
    }

    public void setIdpost(Integer idpost) {
        this.idpost = idpost;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<PostStatus> getPostStatuses() {
        return postStatuses;
    }

    public void setPostStatuses(List<PostStatus> postStatuses) {
        this.postStatuses = postStatuses;
    }

    @Override
    public String toString() {
        return "Post{" +
                "idpost=" + idpost +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", date=" + date +
                ", author=" + author +
                ", comments=" + comments +
                ", postStatuses=" + postStatuses +
                '}';
    }
}
