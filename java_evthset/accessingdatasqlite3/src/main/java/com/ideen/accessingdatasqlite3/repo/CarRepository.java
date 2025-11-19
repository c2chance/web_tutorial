package com.ideen.accessingdatasqlite3.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ideen.accessingdatasqlite3.entity.Car;


public interface CarRepository extends JpaRepository<Car, Long> {}