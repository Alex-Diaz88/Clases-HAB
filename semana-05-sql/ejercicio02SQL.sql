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

create table if not exists direccion (
id int unsigned primary key auto_increment
);

-- Vi necesario crear una 3a tabla con "usuario reside en dirección" porque entiendo que es una relación de M:N
-- Un usuario puede residir en varias direcciones y en una misma dirección pueden residir varios usuarios.
create table if not exists usuario_reside (
id int unsigned primary key auto_increment,
idUsuario int unsigned not null,
foreign key (idUsuario) references usuario (id)
on delete no action,
idDireccion int unsigned not null,
foreign key (idDireccion) references direccion (id)
on delete no action
);

alter table usuario drop column pais;
alter table usuario drop column cp;
alter table usuario drop column direccion1;
alter table usuario drop column direccion2;
alter table usuario drop column direccion3;

alter table direccion add column pais varchar (15) not null;
alter table direccion add column cp varchar (10) not null;
alter table direccion add column direccion1 varchar (30) not null;
alter table direccion add column direccion2 varchar (30);
alter table direccion add column direccion3 varchar (30);


show tables;

drop database people;