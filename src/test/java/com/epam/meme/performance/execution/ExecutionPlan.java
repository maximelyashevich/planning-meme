package com.epam.meme.performance.execution;

import com.epam.meme.config.logic.ApplicationConfiguration;
import com.epam.meme.config.logic.impl.TestConfigurationImpl;
import com.epam.meme.entity.Board;
import com.epam.meme.entity.Story;
import com.epam.meme.service.StoryService;
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@SuppressWarnings("unused")
@Transactional
@State(Scope.Benchmark)
public class ExecutionPlan {

    private AnnotationConfigApplicationContext annotationConfigApplicationContext;

    private StoryService service;

    private Story story;

    private Story updatedStory;

    @Setup(Level.Trial)
    public void setUp() {
        annotationConfigApplicationContext = new AnnotationConfigApplicationContext(ApplicationConfiguration.class,
                TestConfigurationImpl.class);

        service = (StoryService) annotationConfigApplicationContext.getBean("storyServiceImpl");

        story = Story.builder().startTime(LocalDateTime.now()).description("Cool story, Bob")
                .board(Board.builder()
                        .id(1L)
                        .build())
                .build();

        updatedStory = service.findById(1L).orElseThrow(RuntimeException::new);
        story.setDescription("newdescription");
    }

    @Benchmark
    @BenchmarkMode(Mode.All)
    @OutputTimeUnit(TimeUnit.MICROSECONDS)
    public void findById_found(ExecutionPlan executionPlan, Blackhole blackhole) {
        blackhole.consume(service.findById(1L));
    }

    @Benchmark
    @BenchmarkMode(Mode.All)
    @OutputTimeUnit(TimeUnit.MICROSECONDS)
    public void findById_notFound(ExecutionPlan executionPlan, Blackhole blackhole) {
        blackhole.consume(service.findById(Long.MAX_VALUE).isPresent());
    }

    @Benchmark
    @BenchmarkMode(Mode.All)
    @OutputTimeUnit(TimeUnit.MICROSECONDS)
    public void create_created(ExecutionPlan executionPlan, Blackhole blackhole) {
        service.create(story);
        blackhole.consume(story);
    }

    @Benchmark
    @BenchmarkMode(Mode.All)
    @OutputTimeUnit(TimeUnit.MICROSECONDS)
    public void update_updated(ExecutionPlan executionPlan, Blackhole blackhole) {
        service.update(updatedStory);
        blackhole.consume(updatedStory);
    }

    @TearDown(Level.Trial)
    public void tearDown() {
        annotationConfigApplicationContext.close();
    }
}
