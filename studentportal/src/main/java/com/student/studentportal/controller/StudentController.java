package com.student.studentportal.controller;

import com.student.studentportal.entity.Student;
import com.student.studentportal.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable int id, @RequestBody Student updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setFullName(updatedStudent.getFullName());
                    student.setPhone(updatedStudent.getPhone());
                    student.setAddress(updatedStudent.getAddress());
                    student.setDepartment(updatedStudent.getDepartment());
                    student.setSemester(updatedStudent.getSemester());
                    return studentRepository.save(student);
                })
                .orElseGet(() -> {
                    updatedStudent.setStudentId(id);
                    return studentRepository.save(updatedStudent);
                });
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable int id) {
        studentRepository.deleteById(id);
    }
}