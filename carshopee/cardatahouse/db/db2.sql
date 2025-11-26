// give the java class, chatgpt generated a 
CREATE TABLE cars (
    id BIGINT NOT NULL AUTO_INCREMENT,
    brand VARCHAR(255),
    model VARCHAR(255),
    color VARCHAR(255),
    registrationNumber VARCHAR(255),
    modelYear INT,
    price INT,
    owner BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_cars_owner FOREIGN KEY (owner)
        REFERENCES owners(ownerid)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

// origin
// ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO cars
(brand, model, color, registrationNumber, modelYear, price, owner) VALUES
('Toyota', 'Corolla', 'White', 'ABC-123', 2020, 18000, 1),
('Honda', 'Civic', 'Black', 'DEF-456', 2019, 17500, 1),
('Ford', 'Mustang', 'Red', 'GHI-789', 2021, 42000, 2),
('BMW', 'X5', 'Blue', 'JKL-321', 2022, 61000, 2),
('Audi', 'A4', 'Silver', 'MNO-654', 2018, 24000, 3),
('Mercedes', 'C300', 'Black', 'PQR-987', 2020, 39000, 3),
('Tesla', 'Model 3', 'White', 'STU-111', 2021, 50000, 4),
('Nissan', 'Altima', 'Gray', 'VWX-222', 2017, 15000, 4),
('Hyundai', 'Elantra', 'Blue', 'YZA-333', 2019, 16000, 5),
('Kia', 'Sorento', 'White', 'BCD-444', 2020, 23000, 5),
('Volkswagen', 'Golf', 'Green', 'EFG-555', 2018, 15500, 6),
('Chevrolet', 'Camaro', 'Yellow', 'HIJ-666', 2021, 37000, 6),
('Subaru', 'Outback', 'Brown', 'KLM-777', 2019, 26000, 7),
('Mazda', 'CX-5', 'Red', 'NOP-888', 2020, 28000, 7),
('Jeep', 'Wrangler', 'Black', 'QRS-999', 2022, 45000, 8),
('Volvo', 'XC60', 'Silver', 'TUV-000', 2021, 52000, 8),
('Lexus', 'RX350', 'White', 'WXY-112', 2019, 47000, 9),
('Acura', 'TLX', 'Blue', 'ZAB-223', 2020, 36000, 9),
('Honda', 'Accord', 'Black', 'CDE-334', 2021, 29000, 10),
('Toyota', 'Prius', 'Silver', 'FGH-445', 2018, 20000, 10);

--------


CREATE TABLE owners (
    ownerid BIGINT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    PRIMARY KEY (ownerid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO owners (firstname, lastname) VALUES 
('John', 'Smith'),
('Emily', 'Johnson'),
('Michael', 'Williams'),
('Sarah', 'Brown'),
('David', 'Jones'),
('Laura', 'Miller'),
('Daniel', 'Garcia'),
('Sophia', 'Martinez'),
('James', 'Taylor'),
('Olivia', 'Anderson');



.OptionalValidatorFactoryBean     : Failed to set up a Bean Validation provider: jakarta.validation.NoProviderFoundException: Unable to create a Configuration, because no J
akarta Bean Validation provider could be found. Add a provider like Hibernate Validator (RI) to your classpath.
