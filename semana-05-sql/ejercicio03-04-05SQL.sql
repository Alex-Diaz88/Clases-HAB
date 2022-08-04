use people;

insert into usuario (id, nombre, apellido1, apellido2, email, telefono, dni) 
values (1, 'Irvin', 'Lethem', null, 'ilethem0@google.com.au', '993870144', '279948941-9'), 
(2, 'Kylie', 'Mungan', null, 'kmungan1@howstuffworks.com', '497494899', '748551874-7'),
(3, 'Yul', 'Dibbert', null, 'ydibbert2@businesswire.com', '776631050', '215649413-4'),
(4, 'Tamra', 'Mc Gorley', null, 'tmcgorley3@studiopress.com', '921948685', '617064473-7'),
(5, 'Elmira', 'Imbrey', null, 'eimbrey4@cpanel.net', '304168000', '178988896-4');

insert into direccion (pais, cp, direccion1, direccion2, direccion3)
values ('Indonesia', '83297', '98339 Loftsgordon Road', 'Babakanbandung', null),
('Philippines', '44455', '74641 Dwight Avenue', 'Bilar', null),
('Indonesia', '62965', '9510 Milwaukee Street', 'Sumberejo', null),
('Norway', '54756', '8902 Doe Crossing Alley', 'Steinkjer' , null),
('United States', '51471', '8616 Stephen Hill', 'Charleston', null);

select nombre, apellido1, telefono from usuario
order by apellido1 asc;

select count(id), pais from direccion group by pais;

select * from usuario u inner join direccion d
	on (u.id = d.id);




