package com.ideen.accessingdatamongodb;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.data.domain.Example;

import org.testcontainers.containers.MongoDBContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers
class AccessingdatamongodbApplicationTests {

	@Test
	void contextLoads() {
	}

	@Container
	@ServiceConnection
	static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:7.0.2");

	@Autowired
	private CustomerRepository repository;
	
	Customer dave, oliver, carter;

	@BeforeEach
	public void setUp() {

		repository.deleteAll();

		dave = new Customer("Dave", "Matthews");
		oliver = new Customer("Oliver", "Matthews");
		carter = new Customer("Carter", "Beauford");
				
		repository.save(dave);
		repository.save(oliver);
		repository.save(carter);
	}

	@Test
	public void setsIdonSave() {
		Customer john = new Customer("John", "Doe");

		assertThat(john.id).isNotNull();
	}

	@Test
	public void findsByLastName() {
		List<Customer> customers = repository.findByLastName("Matthews");

		assertThat(customers).hasSize(2);
	}

	@Test
	public void findsByExample() {
		Customer probe = new Customer();
		probe.setLastName("Matthews");

		Example<Customer> example = Example.of(probe);

		List<Customer> customers = repository.findAll(example);

		assertThat(customers).hasSize(2).extracting(Customer::getFirstName).containsOnly("Dave", "Oliver");
	}

}
