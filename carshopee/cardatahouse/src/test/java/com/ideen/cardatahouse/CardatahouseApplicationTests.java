package com.ideen.cardatahouse;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ideen.cardatahouse.domain.OwnerRepository;
import com.ideen.cardatahouse.web.CarController;

@Disabled("Temporarily disabled")
@SpringBootTest
class CardatahouseApplicationTests {
    @Autowired
    private CarController CarController;

    @Autowired
    private OwnerRepository ownerRepository;

    @Test
    void contextLoads() {
        assertThat(CarController).isNotNull();
        assert (ownerRepository != null);
    }

}