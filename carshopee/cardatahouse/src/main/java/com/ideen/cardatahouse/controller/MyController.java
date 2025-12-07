package com.ideen.cardatahouse.controller;

import java.time.LocalDateTime;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String home(Model model) {

        model.addAttribute("now", LocalDateTime.now());

        return "index";
    }
    
}
