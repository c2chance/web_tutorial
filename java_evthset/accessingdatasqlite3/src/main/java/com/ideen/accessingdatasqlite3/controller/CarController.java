package com.ideen.accessingdatasqlite3.controller;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideen.accessingdatasqlite3.entity.Car;
import com.ideen.accessingdatasqlite3.repo.CarRepository;


@RestController
@RequestMapping("/cars")
public class CarController {


    private final CarRepository repo;


    public CarController(CarRepository repo) {
        this.repo = repo;
    }


    @GetMapping
    public List<Car> list() {
        return repo.findAll();
    }


    @GetMapping("/{id}")
    public Car get(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }


    @PostMapping
        public Car create(@RequestBody Car c) {
    return repo.save(c);
    }


    @PutMapping("/{id}")
        public Car update(@PathVariable Long id, @RequestBody Car c) {
        c.id = id;
        return repo.save(c);
    }


    @DeleteMapping("/{id}")
        public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}