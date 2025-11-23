package com.ideen.cardatahouse.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        // Forward to the static index.html under src/main/resources/static
        return "forward:/index.html";
    }

}
