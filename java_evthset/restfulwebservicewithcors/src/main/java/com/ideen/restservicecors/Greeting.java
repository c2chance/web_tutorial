package com.ideen.restservicecors;

public record Greeting(long id, String content) {
    
    public Greeting() {
        this(-1, "");
    }
}
