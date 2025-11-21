package com.ideen.accessingdatasqlite3;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ideen.accessingdatasqlite3.controller.CarController;
import com.ideen.accessingdatasqlite3.repo.CarRepository;

@SpringBootTest
public class CarRepositoryTest {


	@Autowired
	private CarRepository repo;

	@Autowired
	private CarController carController;

	@Test
	@DisplayName("Context Loads")
	void contextLoads() {
		assertNotNull(carController);
	}
/*
	@BeforeEach
	void cleanDb() {
		//repo.deleteAll();
	}

	@Test
	void testCreateCar() {
		Car c = new Car();
		c.setBrand("BMW");
		c.setModel("M3");
		c.setColor("Blue");
		Car saved = repo.save(c);
		assertNotNull(saved.getId());
	}
*/
}