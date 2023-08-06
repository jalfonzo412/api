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

insert into animales(grupo, especie, raza, anios, peso_aprox, descricpion, url_img) values
	(
        'Mamifero', 
        'Perro', 
        'Dóberman',
        1,
        32.7,
        'Preparate para enamorarte de este maravilloso perro que es una combinación única de elegancia, valentía y alegría',
        'https://pixabay.com/static/frontend/3c346409d336d5f09a7f.svg'
    ),
    (
        'Mamifero', 
        'Perro', 
        'Pastor Aleman',
        0,
        13.5,
        '¡El pastor alemán, el perro todoterreno con actitud de superhéroe! Es el perro perfecto para aventuras emocionantes y travesuras divertidas, ¡un auténtico héroe peludo!',
        'https://cdn.pixabay.com/photo/2019/11/09/20/59/german-shepherd-4614456_640.jpg'
    ),
    (
        'Mamifero', 
        'Gato', 
        'Siberiano',
        1,
        3.8,
        '¡El gato siberiano, el peludo trotamundos con estilo! Es el compañero perfecto para acurrucarse en invierno, ¡te mantendrá caliente y llenará tu vida de pura elegancia felina!',
        'https://cdn.pixabay.com/photo/2020/08/11/18/45/cat-5480864_640.jpg'
    ),
    (
        'Reptil', 
        'Serpiente', 
        'Serpiente del maíz',
        3,
        0.4,
        '¡La serpiente del maíz, la reina de los reptiles con su patrón de escamas de maíz a la moda!',
        'https://cdn.pixabay.com/photo/2016/06/09/15/51/snake-1446008_640.jpg'
    );

alter table animales
change descricpion descripcion text; 

select * from animales;

delete from animales where id = 6;

ALTER TABLE animales 
	ADD cantidad INT;