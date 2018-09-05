package com.epam.meme.config.logic.impl;

import com.epam.meme.config.logic.DataConfiguration;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jndi.JndiTemplate;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;

import javax.annotation.Resource;
import javax.naming.NamingException;
import java.util.Objects;

@Configuration
@Profile("runtime")
public class HanaConfigurationImpl implements DataConfiguration {

    private static final String PROP_DATABASE_PLATFORM = "org.eclipse.persistence.platform.database.HANAPlatform";
    private static final String JDBC_URL = "java:comp/env/jdbc/dshana";

    @Resource
    private Environment env;

    @Bean
    public BasicDataSource dataSource() {
        BasicDataSource dataSource = null;
        try {
            dataSource = (BasicDataSource) new JndiTemplate().lookup(Objects.requireNonNull(env.getProperty(JDBC_URL)));
        } catch (NamingException e) {
            e.printStackTrace();
        }
        return dataSource;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        EclipseLinkJpaVendorAdapter vendorAdapter = new EclipseLinkJpaVendorAdapter();
        vendorAdapter.setDatabase(Database.POSTGRESQL);
        vendorAdapter.setDatabasePlatform(PROP_DATABASE_PLATFORM);
        return vendorAdapter;
    }

}
