package com.ideen.accessingdatasqlite3.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ideen.accessingdatasqlite3.model.Car;


/**
 * Spring Data JPA Repository for Car entity.
 * provide findAll, findById, save, deleteById etc. CRUD methods.
 * Generic type parameters: <Car, Long>
 */
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    // custom query method example
    // Spring Data JPA will automatically implement this request: SELECT * FROM car WHERE brand = ?
    java.util.List<Car> findByBrand(String brand);
}
