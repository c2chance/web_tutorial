package com.ideen.accessingdatasqlite3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ideen.accessingdatasqlite3.repo.CarRepository;




@SpringBootTest
public class CarRepositoryTest {


@Autowired
private CarRepository repo;

/*
@Test
void testCreateCar() {
	Car c = new Car();
	c.brand = "BMW";
	c.model = "M3";
	c.color = "Blue";
	Car saved = repo.save(c);
	assertNotNull(saved.id);
}
*/
}