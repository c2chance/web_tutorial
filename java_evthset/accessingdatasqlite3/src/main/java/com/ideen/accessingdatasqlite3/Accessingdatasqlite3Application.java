package com.ideen.accessingdatasqlite3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Accessingdatasqlite3Application {

	public static void main(String[] args) {
		SpringApplication.run(Accessingdatasqlite3Application.class, args);
        System.out.println("Car Shopee Application started successfully on http://localhost:8080");
        System.out.println("Available APIs:");
        System.out.println("  - GET /api/cars         : Get all cars");
        System.out.println("  - GET /api/cars/{id}    : Get one car");
        System.out.println("  - POST /api/cars        : Create a New car (need JSON Body)");
        System.out.println("  - PUT /api/cars/{id}    : Update one car");
        System.out.println("  - DELETE /api/cars/{id} : Delete one car");		
	}
}
