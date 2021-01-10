CREATE TABLE `nwhacks2021`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(200) NOT NULL,
  `last_name` VARCHAR(200) NOT NULL,
  `username` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `has_covid` TINYINT GENERATED ALWAYS AS (0),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `nwhacks2021`.`location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lat` FLOAT NOT NULL,
  `lon` FLOAT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `nwhacks2021`.`user_location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `id_idx` (`location_id` ASC) VISIBLE,
  CONSTRAINT `location`
    FOREIGN KEY (`location_id`)
    REFERENCES `nwhacks2021`.`location` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `user`
    FOREIGN KEY (`user_id`)
    REFERENCES `nwhacks2021`.`user` (`id`)
    ON DELETE CASCADE
ON UPDATE CASCADE);

##STORED_PROCEDURE:
DELIMITER //
DROP PROCEDURE IF EXISTS nwhacks2021.register_been_to_location;
CREATE PROCEDURE register_been_to_location(IN email varchar(30), IN lat INT, IN lon INT)
BEGIN
	DECLARE uid INT DEFAULT 0;
    DECLARE loc_id INT DEFAULT 0;

	SELECT id INTO uid FROM user
    WHERE user.email=email;
    
    INSERT INTO location (lat, lon)
    VALUES (lat, lon);
    SELECT LAST_INSERT_ID() INTO loc_id;
    
    INSERT INTO user_location (user_id, location_id)
    VALUES (uid, loc_id);
END//
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS nwhacks2021.get_covid_count;
CREATE PROCEDURE get_covid_count(IN lat INT, IN lon INT)
BEGIN
	DECLARE loc_id INT DEFAULT 0;
    
    SELECT id INTO loc_id
    FROM nwhacks2021.location
    WHERE location.lat = lat AND location.lon = lon;

	SELECT COUNT(DISTINCT has_covid) 
	AS covid_count	
	FROM nwhacks2021.user
	INNER JOIN nwhacks2021.user_location
	ON user.id = user_location.user_id
	WHERE user_location.location_id = loc_id AND has_covid=true;

END//
DELIMITER ;


