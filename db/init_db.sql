CREATE TABLE user(
	`userid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(60) NOT NULL UNIQUE,
	`email` VARCHAR(60) NOT NULL,
	`phone` VARCHAR(60) NOT NULL,
	`password` VARCHAR(128) NOT NULL,
	`salt` VARCHAR(32) NOT NULL,
	`full_name` VARCHAR(60) NOT NULL,
	`role` VARCHAR(60) NOT NULL,
	PRIMARY KEY (`userid`)
);

CREATE TABLE building(
  `buildingid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `bathrooms` INT NOT NULL,
  `bedrooms` INT NOT NULL,
  `floor_space` INT NULL,
  `building_type` VARCHAR(60) NULL,
  `storeys` INT NULL,
  `appliances` VARCHAR(200) NULL,
  PRIMARY KEY (`buildingid`)
);

CREATE TABLE property(
  `propertyid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `property_age` INT NULL,
  `annual_property_tax` DECIMAL(9,2) NULL,
  `parking_type` VARCHAR(60) NULL,
  `amenities` VARCHAR(200) NULL,
  PRIMARY KEY (`propertyid`)
);

CREATE TABLE location(
  `locationid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(60) NOT NULL,
  `province_state` VARCHAR(60) NOT NULL,
  `city` VARCHAR(60) NOT NULL,
  `address` VARCHAR(60) NOT NULL,
  `postal_code` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`locationid`)
);

CREATE TABLE listing(
	`listingid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`buildingid` SMALLINT(6) NOT NULL DEFAULT 1,
	`propertyid` SMALLINT(6) NOT NULL DEFAULT 1,
	`locationid` SMALLINT(6) NOT NULL DEFAULT 1,
	`seller_username` VARCHAR(60) NOT NULL,
	`title` VARCHAR(200) NOT NULL,
	`price` INT NOT NULL,
	`listing_type` VARCHAR(60) NOT NULL,
	`description` VARCHAR(2000) NULL,
	PRIMARY KEY (`listingid`),
	FOREIGN KEY (`buildingid`) REFERENCES building(`buildingid`),
	FOREIGN KEY (`propertyid`) REFERENCES property(`propertyid`),
	FOREIGN KEY (`locationid`) REFERENCES location(`locationid`),
	FOREIGN KEY (`seller_username`) REFERENCES user(`username`)
);


INSERT INTO user(username, email, phone, password, salt, full_name, role) 
	VALUES("admin", "admin@hotmail.com", "123-123-1234",
		"c653fbf38d6ce3743222283eb994e5b910265d9373f42b82fe26616a4ce410c94a40852248d5bc6c7239783d5ac4ac6a3d1c5e1c090c1f2651c60d3faaa87e7a",
		"bf65394eded7d006d652e48a6b2f8da2",
		"admin user", "admin"
	);

INSERT INTO building(bathrooms, bedrooms, floor_space, building_type, storeys, appliances) VALUES(2, 3, 1500, "Apartment", 25, 'A/C, Fridge, Stove');
INSERT INTO property(property_age, annual_property_tax, parking_type, amenities) VALUES(3, 4300, "2 Parking lot spaces", "Gym, Pool, Daycare");
INSERT INTO location(country, province_state, city, address, postal_code) VALUES("Canada", "BC", "Burnaby", "8888 University Drive", "V5A 1S6");
INSERT INTO listing(buildingid, propertyid, locationid, seller_username, title, price, listing_type, description) VALUES(1, 1, 1, 'admin', 'New apartment unit at SFU', 653000, 'sale', 'New unit in floor 12 of building XXX at SFU');

INSERT INTO building(bathrooms, bedrooms, floor_space, building_type, storeys, appliances) VALUES(3, 4, 2200, "House", 2, 'A/C, Fridge, Stove');
INSERT INTO property(property_age, annual_property_tax, parking_type, amenities) VALUES(4, 6300, "2 car garage", "Gym, Pool");
INSERT INTO location(country, province_state, city, address, postal_code) VALUES("Canada", "BC", "Burnaby", "6363 Kitchener St", "V5B 2J4");
INSERT INTO listing(buildingid, propertyid, locationid, seller_username, title, price, listing_type, description) VALUES(2, 2, 2, 'admin', 'Modern Burnaby house', 1443000, 'sale', '4 bedroom 3 bath home in Burnaby');

INSERT INTO building(bathrooms, bedrooms, floor_space, building_type, storeys, appliances) VALUES(2, 2, 1200, "Apartment", 25, 'A/C, Fridge, Stove');
INSERT INTO property(property_age, annual_property_tax, parking_type, amenities) VALUES(3, 2300, "1 Parking lot space", "Gym, Pool, Daycare");
INSERT INTO location(country, province_state, city, address, postal_code) VALUES("Canada", "BC", "Burnaby", "8888 University Drive", "V5A 1S6");
INSERT INTO listing(buildingid, propertyid, locationid, seller_username, title, price, listing_type, description) VALUES(3, 3, 3, 'admin', 'Renting apartment unit at SFU', 2300, 'rent', 'New unit in floor 5 of building XXX at SFU for rent');

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
