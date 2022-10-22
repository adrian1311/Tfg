package com.tfg.pasos.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.TreeMap;


@Entity
@Data
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @JsonProperty(value = "name")
    @Column(name = "name")
    private String name;

    @JsonProperty(value = "refresh_token")
    @Column(name = "refresh_token")
    private String refresh_token;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "height")
    private Integer height;

    @Column(name = "gender")
    private String gender;

    @Column(name = "age")
    private Date age;

    @Column(name = "estimated_steps")
    private Integer estimatedSteps;

    @Column(name = "notes")
    private String notes;

    @Column(name = "sit_up")
    private Integer sitUp;

    @Column(name = "elbow_flexion")
    private Integer elbowFlexion;

    @Column(name = "walks")
    private Integer walks;

    @Column(name = "march")
    private Integer march;

    @Column(name = "trunk_flexion")
    private Integer trunkFlexion;

    @Column(name = "shoulders_flexion")
    private Integer shouldersFlexion;

    @Column(name = "up_walk_sit")
    private Double upWalkSit;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "base_encoded_image")
    private String base64encodedImage;

    @Transient
    private List<UserStepsAndDates> stepsWithDates;

    @Transient
    private TreeMap<LocalDate, Integer> stepsWithDatesMap;

    @Transient
    private TreeMap<LocalDateTime, Integer> stepsWithDatesMapWithTime;
}