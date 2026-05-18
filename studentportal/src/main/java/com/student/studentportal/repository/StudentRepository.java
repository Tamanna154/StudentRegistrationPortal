package com.student.studentportal.repository;

import com.student.studentportal.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository
        extends JpaRepository<Student, Integer> {

    Student findByFullName(String fullName);
}