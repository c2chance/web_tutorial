package com.ideen.accessingdatasqlite3;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.ideen.accessingdatasqlite3.model.Car;
import com.ideen.accessingdatasqlite3.repo.CarRepository;

@DataJpaTest
public class CarRepositoryJpaTest {
    @Autowired
    private CarRepository repo;

    @BeforeEach
    void cleanDb() {
        repo.deleteAll();
    }

    @Test
    void testCreateCar() {
        Car c = new Car();
        c.setBrand("Tesla");
        c.setModel("Model X");
        c.setColor("Yellow");
        Car saved = repo.save(c);

        assertThat(repo.findByBrand("Tesla"))
            .isNotEmpty()
            .allMatch(car -> car.getModel().equals("Model X"))
            .allMatch(car -> car.getColor().equals("Yellow"));
    }
    
    @Test
    void testDeleteCars() {
        Car c = new Car();
        c.setBrand("Tesla");
        c.setModel("Model Y");
        c.setColor("White");
        Car saved = repo.save(c);

        //repo.save(new Car("Tesla", "Model Y", "White"));
        repo.deleteAll();
        assertThat(repo.count()).isEqualTo(0);
    }
}
