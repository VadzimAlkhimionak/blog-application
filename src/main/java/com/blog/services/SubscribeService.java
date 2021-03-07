package com.blog.services;

import com.blog.models.Subscribe;
import com.blog.models.User;

public interface SubscribeService {
    Subscribe subscribe(int subscriber, int author);
    void unsubscribe(User reader, int authorId);
    boolean checkSubscribe(User reader, int authorId);
}
