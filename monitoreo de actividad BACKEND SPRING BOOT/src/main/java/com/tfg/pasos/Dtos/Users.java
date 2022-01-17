package com.tfg.pasos.Dtos;

import lombok.Data;

import javax.persistence.*;


@Entity
@Data
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "refresh_token")
    private String refresh_token;


}
