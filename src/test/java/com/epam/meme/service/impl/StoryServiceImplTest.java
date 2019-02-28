package com.epam.meme.service.impl;

import com.epam.meme.config.logic.ApplicationConfiguration;
import com.epam.meme.entity.Board;
import com.epam.meme.entity.Story;
import com.epam.meme.service.StoryService;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Ignore
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@ContextConfiguration(classes = {ApplicationConfiguration.class})
@Transactional
public class StoryServiceImplTest {

    @Autowired
    private StoryService service;

    @Test
    public void findById_found() {
        Assert.assertTrue(service.findById(1L).isPresent());
    }

    @Test
    public void findById_notFound() {
        Assert.assertFalse(service.findById(Long.MAX_VALUE).isPresent());
    }

    @Test
    public void create_created() {
        Story story = Story.builder()
                .startTime(LocalDateTime.now())
                .description("Cool story, Bob")
                .board(Board.builder()
                        .id(1L)
                        .build())
                .build();

        service.create(story);
    }

    @Test
    public void update_updated() {
        Story story = service.findById(1L).orElseThrow(RuntimeException::new);
        story.setDescription("newdescription");
        service.update(story);
        Assert.assertEquals("newdescription", service.findById(1L)
                .orElseThrow(RuntimeException::new).getDescription());
    }

    @Test(expected = JpaSystemException.class)
    public void update_notUpdated() {
        Story story = new Story();
        service.update(story);
    }
}
