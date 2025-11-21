package com.ideen.accessingdatamongodb;

import org.springframework.boot.SpringApplication;

public class TestAccessingdatamongodbApplication {

	public static void main(String[] args) {
		SpringApplication.from(AccessingdatamongodbApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
