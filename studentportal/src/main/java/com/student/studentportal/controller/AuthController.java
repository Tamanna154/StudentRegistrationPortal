package com.student.studentportal.controller;

import com.student.studentportal.entity.Student;
import com.student.studentportal.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/signup")
    public Student signup(
            @RequestBody Student student
    ) {

        return studentRepository.save(student);
    }

    @PostMapping("/login")
    public String login(
            @RequestBody Student student
    ) {

        Student existingStudent =
                studentRepository.findByFullName(
                        student.getFullName()
                );

        if(existingStudent != null) {

            return "LOGIN_SUCCESS";

        } else {

            return "USER_NOT_FOUND";
        }
    }
}