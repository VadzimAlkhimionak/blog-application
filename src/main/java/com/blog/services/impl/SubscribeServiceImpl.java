package com.blog.services.impl;

import com.blog.models.Subscribe;
import com.blog.models.User;
import com.blog.repositories.SubscribeRepository;
import com.blog.repositories.UserRepository;
import com.blog.services.SubscribeService;
import com.blog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscribeServiceImpl implements SubscribeService {
    @Autowired
    private SubscribeRepository subscribeRepository;

    @Autowired
    private UserService userService;

    @Override
    public Subscribe subscribe(int idAuthor, int idSubscriber) {
        User subscriber = userService.getUser(idSubscriber);
        User author = userService.getUser(idAuthor);

        Subscribe subscribe = new Subscribe();
        subscribe.setSubscriber(subscriber);
        subscribe.setAuthor(author);

        return subscribeRepository.save(subscribe);
    }

    @Override
    public void unsubscribe(User reader, int authorId) {
        List<Subscribe> subscribesAuthor = userService.getUser(authorId).getSubscribes();

        for (Subscribe subscribe : subscribesAuthor) {
            if (subscribe.getSubscriber().getId() == reader.getId()) {
                subscribe.setAuthor(null);
                subscribe.setSubscriber(null);
                subscribeRepository.delete(subscribe);
            }
        }
    }

    @Override
    public boolean checkSubscribe(User reader, int authorId) {
        User author = userService.getUser(authorId);

        for (Subscribe subscribe : author.getSubscribes()) {
            if (subscribe.getSubscriber().equals(reader)) {
                return true;
            }
        }

        return false;
    }
}
