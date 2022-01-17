package com.tfg.pasos.Repository;

import com.tfg.pasos.Dtos.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {

}
