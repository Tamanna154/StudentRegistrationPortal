package com.student.studentportal.controller;

import com.student.studentportal.entity.Admin;
import com.student.studentportal.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @GetMapping
    public List<Admin> getAdmins() {
        return adminRepository.findAll();
    }

    @PostMapping
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "Welcome Admin Dashboard";
    }
}