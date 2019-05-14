package com.epam.meme.performance.runner;

import com.epam.meme.performance.execution.ExecutionPlan;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.RunnerException;
import org.openjdk.jmh.runner.options.Options;
import org.openjdk.jmh.runner.options.OptionsBuilder;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class BenchmarkRunner {

    public static void main(String[] args) throws RunnerException {

        final Options options = new OptionsBuilder()
                .include(ExecutionPlan.class.getSimpleName())
                .forks(1)
                .measurementIterations(10)
                .warmupIterations(1)
                .shouldDoGC(true)
                .shouldFailOnError(true)
                .shouldFailOnError(true)
                .jvmArgs("-Dspring.profiles.active=test")
                .build();

        new Runner(options).run();
    }
}


