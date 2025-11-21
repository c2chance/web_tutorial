package com.ideen.accessingdatasqlite3.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ideen.accessingdatasqlite3.model.Car;


/**
 * Spring Data JPA Repository 接口，用于 'Car' 实体。
 * 提供 findAll, findById, save, deleteById 等 CRUD 方法。
 * 泛型参数：<实体类, 主键类型>
 */
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
        // 自定义方法示例：根据品牌查找所有汽车
    // Spring Data JPA 会自动实现此查询：SELECT * FROM cars WHERE brand = ?
    java.util.List<Car> findByBrand(String brand);
}
