package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.ConsoleDetails;


public interface ConsoleRepo extends JpaRepository<ConsoleDetails,Long>{

}
