package com.ideen.learning.howtouselog;
/*
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
*/
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HowtouselogApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(HowtouselogApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		var logger = Logger.getLogger(HowtouselogApplication.class.getName());
		logger.log(Level.WARNING, "Warning info");
		logger.log(Level.INFO, "Info");
		logger.log(Level.CONFIG, "Config info");
		logger.log(Level.FINE, "Fine info");
	}


}
