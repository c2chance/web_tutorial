package com.ideen.accessingdatamysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // This means that this class is a Controller
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class MainController {
    @Autowired //
    private UserRepository userRepository;

    @PostMapping(path="/add") // Map ONLY POST Request
    public @ResponseBody String addNewUser (@RequestParam String name, 
            @RequestParam String email) {

        User newuser = new User();
        newuser.setName(name);
        newuser.setEmail(email);
        userRepository.save(newuser);
        return "Saved";
    }

    @GetMapping(path="/all") // Map ONLY GET Requests
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }    
}
