package com.epam.meme.cucumber.runner;

import com.codeborne.selenide.Configuration;
import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.runner.RunWith;

@Ignore
@RunWith(Cucumber.class)
@CucumberOptions(
        plugin = {"html:target/cucumber-report/smoketest", "json:target/cucumber.json"},
        features = "src/test/java/com/epam/meme/cucumber/feature/",
        glue = "com/epam/meme/cucumber/step",
        tags = {"~@Ignore", "@smoketest"}
)
public class SmokeTest {
    private static final String WEB_DRIVER_CHROME = "webdriver.chrome.driver";
    private static final String WEB_DRIVER_DIRECTORY = "src/test/resources/driver/chromedriver.exe";
    private static final String BASE_URL = "http://localhost:8081/";
    private static final String BROWSER_NAME = "chrome";

    @BeforeClass
    public static void setupTimeout() {
        Configuration.timeout = 10000;
        System.setProperty(WEB_DRIVER_CHROME, WEB_DRIVER_DIRECTORY);
        Configuration.browser = BROWSER_NAME;
        Configuration.timeout = 1000;
        Configuration.baseUrl = BASE_URL;
    }
}
