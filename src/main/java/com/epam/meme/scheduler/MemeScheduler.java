package com.epam.meme.scheduler;

import com.epam.meme.entity.User;
import com.epam.meme.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class MemeScheduler {

    @Autowired
    private UserService userService;

    @Scheduled(cron="*/5 * * * * *")
    public void trackDullUsers(){
        System.out.println("Schedule is running...");
        for (User user: userService.identifyDullUsers(LocalDateTime.now().minusDays(3))){
            // System.out.println(user);
            //userService.delete(user);
        }
    }
}
