package com.example.demo.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.AdminRegDetails;
import com.example.demo.service.AdminRegService;



@RestController
@CrossOrigin("http://localhost:5173/")
public class AdminController {

    @Autowired
    private AdminRegService adminRegService;

    @PostMapping("/adminland")
    public String adminHome(@ModelAttribute AdminRegDetails adminRegDetails, @RequestParam("file") MultipartFile image,@RequestParam("file2") MultipartFile image2) throws IOException {
        if (image != null && !image.isEmpty()) {
            adminRegDetails.setAdminPhoto(image.getBytes());
            adminRegDetails.setImageContentType(image.getContentType());
        } else {
            return "No image uploaded";
        }
        
        if (image2 != null && !image2.isEmpty()) {
            adminRegDetails.setShopPhoto(image2.getBytes());
            adminRegDetails.setImageContentType2(image2.getContentType());
        } else {
            return "No image uploaded";
        }
        
        adminRegService.saveAdminRegDetail(adminRegDetails);
        return "Entered Successfully";
    }

	
	@PostMapping("/adminland2")
	public String adminlandpage(@RequestParam("adminUsername") String username, 
	                            @RequestParam("adminPassword") String password, 
	                            Model model) {
	    AdminRegDetails user = adminRegService.login(username, password);
	    
	    if (user != null) { 
	        model.addAttribute("id", user.getId());
	        return "User Found";
	    } else {
	        return "User not found";
	    }
	}
	
	@GetMapping("/adminpage/{adminUsername}")
	public ResponseEntity<Object> fetchAdminDetail(@PathVariable String adminUsername){
		AdminRegDetails adminDetail = adminRegService.findByUsername(adminUsername);
		
		if (adminDetail.getAdminPhoto() != null) {
	        String base64Image = "data:" + adminDetail.getImageContentType() + ";base64," + 
	                             Base64.getEncoder().encodeToString(adminDetail.getAdminPhoto());
	        adminDetail.setAdminPhoto(null);
	        adminDetail.setImageContentType(base64Image);
	    }
		
		return new ResponseEntity<Object>(adminDetail,HttpStatus.OK);
	}
	
	@GetMapping("/gamecenters/{district}")
	public ResponseEntity<Object> fetchGameCenters(@PathVariable String district){
		List<AdminRegDetails> details = adminRegService.findGameCenters(district);
		if(details != null) {
			List<Map<String, Object>> response = new ArrayList<>();
			
			for(AdminRegDetails center: details) {
				if (center.getShopPhoto() != null) {
			        String base64Image = "data:" + center.getImageContentType2() + ";base64," + 
			                             Base64.getEncoder().encodeToString(center.getShopPhoto());
			        center.setShopPhoto(null);
			        center.setImageContentType2(base64Image);
			    }
				Map<String,Object> gameCenter = new HashMap<>();
				gameCenter.put("shopPhoto", center.getImageContentType2());
				gameCenter.put("shopName", center.getShopName());
				gameCenter.put("shopId", center.getId());
				response.add(gameCenter);
			}
			
			return new ResponseEntity<Object>(response,HttpStatus.OK);
		}
		
		return new ResponseEntity<Object>("not found game center",HttpStatus.NOT_FOUND);
	}

	
	
//	@RequestMapping("/log")
//	public String adminLogin() {
//		return "adminlog";
//	}
}
