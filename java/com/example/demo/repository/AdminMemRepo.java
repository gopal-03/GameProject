package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.AdminMemInfo;



@Repository
public interface AdminMemRepo extends JpaRepository<AdminMemInfo,Long>{

}
