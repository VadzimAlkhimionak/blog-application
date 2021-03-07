package com.blog.services.impl;

import com.blog.models.Role;
import com.blog.repositories.RoleRepository;
import com.blog.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Role getByRole(String rolename) {
        return roleRepository.getByRolename(rolename);
    }
}
