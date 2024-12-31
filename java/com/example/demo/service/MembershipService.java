package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.AdminMemInfo;
import com.example.demo.model.MembershipDetails;
import com.example.demo.repository.AdminMemRepo;
import com.example.demo.repository.UserMemRepo;


@Service
public class MembershipService{
	
	@Autowired
	AdminMemRepo adminMemRepo;
	
	@Autowired
	UserMemRepo userMemRepo;
	
	public List<AdminMemInfo> getAllAdminMemDetails() {
        return adminMemRepo.findAll();  
    }

    public void saveAdminMemDetail(AdminMemInfo adminmemInfo) {
    	adminMemRepo.save(adminmemInfo); 
    }

    public AdminMemInfo getAdminMemDetailtById(Long id) {
        return adminMemRepo.findById(id).orElse(null);  
    }

    public void deleteAdminMem(Long id) {
    	adminMemRepo.deleteById(id);  
    }
    
    public void saveUserMemDetail(MembershipDetails membershipDetail) {
    	userMemRepo.save(membershipDetail); 
    }
    
    public MembershipDetails findUserByUsername(String username) {
    	return userMemRepo.findByUsername(username);
    }
    
    public List<MembershipDetails> getAllUserMemDetails() {
        return userMemRepo.findAll();  
    }
    
}
