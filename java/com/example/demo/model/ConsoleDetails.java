package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ConsoleDetails {
	
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
Long id;
String consoleName;
Float pricePerHour;
Float membershipOffer;

public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getConsoleName() {
	return consoleName;
}
public void setConsoleName(String consoleName) {
	this.consoleName = consoleName;
}
public Float getPricePerHour() {
	return pricePerHour;
}
public void setPricePerHour(Float pricePerHour) {
	this.pricePerHour = pricePerHour;
}
public Float getMembershipOffer() {
	return membershipOffer;
}
public void setMembershipOffer(Float membershipOffer) {
	this.membershipOffer = membershipOffer;
}

}

