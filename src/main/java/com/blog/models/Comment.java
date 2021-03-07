package com.blog.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer idcomment;

    private String description;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_idpost")
    private Post idpost;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_iduser")
    private User user;

    public Comment() {}

    public Comment(Integer idcomment, String description, Post idpost, User user) {
        this.idcomment = idcomment;
        this.description = description;
        this.idpost = idpost;
        this.user = user;
    }

    public Integer getIdcomment() {
        return idcomment;
    }

    public void setIdcomment(Integer idcomment) {
        this.idcomment = idcomment;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Post getIdpost() {
        return idpost;
    }

    public void setIdpost(Post idpost) {
        this.idpost = idpost;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "idcomment=" + idcomment +
                ", description='" + description + '\'' +
                ", idpost=" + idpost +
                ", user=" + user +
                '}';
    }
}
