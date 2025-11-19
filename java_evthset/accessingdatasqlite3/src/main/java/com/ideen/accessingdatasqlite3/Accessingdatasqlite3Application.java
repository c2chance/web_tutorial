package com.ideen.accessingdatasqlite3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Accessingdatasqlite3Application {

	public static void main(String[] args) {
		SpringApplication.run(Accessingdatasqlite3Application.class, args);
        System.out.println("Car Shopee Application started successfully on http://localhost:8080");
        System.out.println("Available APIs:");
        System.out.println("  - GET /api/cars         : 获取所有车辆");
        System.out.println("  - GET /api/cars/{id}    : 获取单个车辆");
        System.out.println("  - POST /api/cars        : 创建新车辆 (需要 JSON Body)");
        System.out.println("  - PUT /api/cars/{id}    : 更新车辆");
        System.out.println("  - DELETE /api/cars/{id} : 删除车辆");		
	}
}
