package com.tfg.pasos.Manager;

import com.tfg.pasos.Dtos.Users;
import com.tfg.pasos.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasosManager {

    @Autowired
    UsersRepository usersRepository;

    public List<Users> getUsers(){
        return usersRepository.findAll();
    }
}
