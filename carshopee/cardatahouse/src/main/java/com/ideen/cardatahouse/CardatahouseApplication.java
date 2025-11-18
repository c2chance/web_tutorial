package com.ideen.cardatahouse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ideen.cardatahouse.domain.AppUserRepository;
import com.ideen.cardatahouse.domain.Car;
import com.ideen.cardatahouse.domain.CarRepository;
import com.ideen.cardatahouse.domain.OwnerRepository;


@SpringBootApplication
public class CardatahouseApplication implements CommandLineRunner{
    private static final Logger logger = LoggerFactory.getLogger(CardatahouseApplication.class);

    private final CarRepository repository;
    private final OwnerRepository ownerRepository;
    private final AppUserRepository appUserRepository;

    public CardatahouseApplication(CarRepository repository, OwnerRepository ownerRepository, 
		AppUserRepository appUserRepository) {
        this.repository = repository;
        this.ownerRepository = ownerRepository;
        this.appUserRepository = appUserRepository;
    }


    public static void main(String[] args) {
        SpringApplication.run(CardatahouseApplication.class, args);
        logger.info("Application started");
    }

    @Override
    public void run(String... args) throws Exception {
/*
        // Add owner objects and save these to db
        Owner owner1 = new Owner("John", "Johnson");
        Owner owner2 = new Owner("Mary", "Robinson");
        ownerRepository.saveAll(Arrays.asList(owner1, owner2));

        repository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2023, 59000, owner1));
        repository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2020, 29000, owner2));
        repository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2022, 39000, owner2));

        // Username: user, password: user
        appUserRepository
                .save(new AppUser("user", "$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue", "USER"));
        // Username: admin, password: admin
        appUserRepository
                .save(new AppUser("admin", "$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
 */
        for (Car car : repository.findAll()) {
            logger.info("brand: {}, model: {}", car.getBrand(), car.getModel());
        }
        for (var appUser : appUserRepository.findAll()) {
            logger.info("appUser: {}, role: {}", appUser.getUsername(), appUser.getRole());
        }
    }
}
