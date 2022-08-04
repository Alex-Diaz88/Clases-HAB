create database if not exists people;

use people;

create table if not exists usuario (
id int unsigned primary key auto_increment,
dni varchar(15) not null,
nombre varchar (20) not null,
apellido1 varchar (20) not null,
apellido2 varchar (20),
telefono varchar (20) not null,
email varchar (30) not null,
pais varchar(15) not null,
cp varchar (10) not null,
direccion1 varchar (30) not null,
direccion2 varchar (30),
direccion3 varchar (30)
);

show tables;