package com.tfg.pasos.Controllers;

import com.tfg.pasos.Dtos.Users;
import com.tfg.pasos.Manager.PasosManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("pasos")

public class PasosController {

    @Autowired
    PasosManager pasosManager;

    @GetMapping(value = "/getUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Users> showProductsInShop() {
        return pasosManager.getUsers();
    }
}
