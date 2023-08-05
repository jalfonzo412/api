CREATE DATABASE IF NOT EXISTS centro_adopcion;

USE centro_adopcion;

CREATE TABLE animales( 
	id INT PRIMARY KEY AUTO_INCREMENT,
    grupo VARCHAR(20) NOT NULL,
    especie VARCHAR(20) NOT NULL,
    raza VARCHAR(20),
    anios INT,
    peso_aprox DOUBLE,
    descricpion TEXT
);

SELECT * FROM animales;

ALTER TABLE animales 
ADD created TIMESTAMP NOT NULL DEFAULT NOW(),
ADD updated TIMESTAMP NOT NULL DEFAULT NOW();

ALTER TABLE animales 
ADD url_img TEXT;

DESCRIBE animales;