use people;

alter table usuario add column edad int unsigned;

set SQL_SAFE_UPDATES = 0;

update usuario set edad = 20 where usuario.id = 1;
update usuario set edad = 55 where usuario.id = 2;
update usuario set edad = 37 where usuario.id = 3;
update usuario set edad = 15 where usuario.id = 4;
update usuario set edad = 78 where usuario.id = 5;

select * from usuario;

-- Selecciona el nombre y la edad del/los usuario/s más mayores
select nombre, edad from usuario order by edad desc limit 1;

-- select max(edad), nombre from usuario; *****

select * from usuario;