package com.blog.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer idrole;

    @Column(name = "rolename")
    private String rolename;

    @ManyToMany(targetEntity = User.class, mappedBy = "roles")
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public Role() {}

    public Role(Integer idrole, String rolename, List<User> users) {
        this.idrole = idrole;
        this.rolename = rolename;
        this.users = users;
    }

    public Integer getIdrole() {
        return idrole;
    }

    public void setIdrole(Integer idrole) {
        this.idrole = idrole;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
