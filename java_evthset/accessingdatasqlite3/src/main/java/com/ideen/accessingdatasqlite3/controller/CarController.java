package com.ideen.accessingdatasqlite3.controller;

import com.ideen.accessingdatasqlite3.model.Car;
import com.ideen.accessingdatasqlite3.repo.CarRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarRepository carRepository;
// --- C: Create (创建新车) ---
    // POST /api/cars
    @PostMapping
    public ResponseEntity<Car> createCar(@RequestBody Car car) {
        try {
            Car savedCar = carRepository.save(car);
            return new ResponseEntity<>(savedCar, HttpStatus.CREATED); // 返回 201 Created
        } catch (Exception e) {
            // 处理唯一性约束冲突等错误
            System.err.println("Error creating car: " + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // 返回 400 Bad Request
        }
    }

    // --- R: Read All (读取所有车辆) ---
    // GET /api/cars
    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // --- R: Read One (根据 ID 读取单个车辆) ---
    // GET /api/cars/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Integer id) {
        Optional<Car> carData = carRepository.findById(id);

        if (carData.isPresent()) {
            return new ResponseEntity<>(carData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 返回 404 Not Found
        }
    }

    // --- U: Update (更新车辆信息) ---
    // PUT /api/cars/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Integer id, @RequestBody Car carDetails) {
        Optional<Car> carData = carRepository.findById(id);

        if (carData.isPresent()) {
            Car car = carData.get();
            car.setBrand(carDetails.getBrand());
            car.setModel(carDetails.getModel());
            car.setColor(carDetails.getColor());
            
            // modified 字段会由 @UpdateTimestamp 自动更新

            return new ResponseEntity<>(carRepository.save(car), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 返回 404 Not Found
        }
    }

    // --- D: Delete (删除车辆) ---
    // DELETE /api/cars/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCar(@PathVariable Integer id) {
        try {
            carRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 返回 204 No Content
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
}