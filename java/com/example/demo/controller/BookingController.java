package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.ConsoleDetails;
import com.example.demo.model.RegisterDetails;
import com.example.demo.model.UserBooking;
import com.example.demo.service.BookingService;
import com.example.demo.service.ConsoleService;
import com.example.demo.service.RegisterService;




@RestController
public class BookingController{
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	RegisterService registerService;
	
	@Autowired
	ConsoleService consoleService;
	
	
	@PostMapping("/userbookingdetails/save/{id}/{username}")
	public String saveBooking(@PathVariable String username,@PathVariable Long id,
			@RequestBody UserBooking userBooking,Model model) {
		
		RegisterDetails registerDetail = registerService.findUserByUsername(username);
		ConsoleDetails consoleDetail = consoleService.getConsoleDetailtById(id);
		
		userBooking.setConsoleName(consoleDetail.getConsoleName());
		userBooking.setUname(registerDetail.getUsername());
		userBooking.setMobileno(registerDetail.getMobno());
		userBooking.setAmountPayed(consoleDetail.getPricePerHour());
	    bookingService.saveUserBooking(userBooking);
	    
	    
	    return "booked successfully";
	}

	@GetMapping("/userbookingdetails/list/{username}")
	public ResponseEntity<Object> listStudents(@PathVariable String username,Model model) {
		List<UserBooking> bookinglist=bookingService.getBookingsByUsername(username);
		return new ResponseEntity<Object>(bookinglist,HttpStatus.OK);
	}
	
	@GetMapping("/userbookingdetails/view/{id}")
	public ResponseEntity<Object> viewStudent(@PathVariable Long id,Model model) {
		UserBooking userBooking=bookingService.getUserBookingById(id);
		return new ResponseEntity<Object>(userBooking,HttpStatus.OK);
	}
	
}