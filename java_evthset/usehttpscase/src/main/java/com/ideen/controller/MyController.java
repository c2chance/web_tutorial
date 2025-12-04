package com.ideen.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotaion.RestController;

@RestController
public class MyController {

    @GetMapping(value = "/hello", produces = MediaType.TEXT_PLAIN_VALUE)
    public String hello() {

        return "hello there";
    }
}