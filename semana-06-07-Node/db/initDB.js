const getDB = require('./getDB');

async function main() {
  let connection;

  try {
      connection = await getDB();

      console.log('Eliminando tablas...');
      await connection.query('drop table if exists product_photo');
      await connection.query('drop table if exists product');
      await connection.query('drop table if exists usuario');
      console.log('Tablas eliminadas');


      console.log('Creando tablas...');
      await connection.query(`
          create table if not exists usuario (
              id int unsigned primary key auto_increment,
              nombre VARCHAR(50) not null,
              apellido1 VARCHAR(50) not null,
              apellido2 VARCHAR(50),
              fecha_nac DATE,
              email VARCHAR(100) not null,
              password VARCHAR(255) not null,
              tipo ENUM ('admin', 'normal') default 'normal',
              createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              )
      `);

      await connection.query(`
          create table if not exists empresa (
              id int unsigned primary key auto_increment,
              nombre varchar(100) not null
              )
              `);
              
      await connection.query(`
          create table if not exists experiencias (
              id int unsigned primary key auto_increment,
              titulo VARCHAR(100) not null,
              precio DECIMAL(8, 2) not null,
              descripcion TEXT,
              localizacion VARCHAR(50) not null,
              idEmpresaOrganiza INT unsigned not null,
              foreign key (idEmpresaOrganiza) references empresa (id)
              )
      `);
      console.log('Tablas creadas');

      
      console.log('Insertando datos...');
      await connection.query(`
          insert into usuario (nombre, apellido1, apellido2, fecha_nac, email, password, tipo)
          values ('Michael', 'Scott', Null, Null, 'michaelscottdf@gmail.com', '12345', 'admin')
      `, 
      );
      
      await connection.query(`
          insert into empresa (nombre)
          values ('DunderMifflin'),
          ('Gueko')
      `, 
      );


      await connection.query(`
          insert into experiencias (titulo, precio, descripcion, localizacion, idEmpresaOrganiza)
          values ('Sales', '50.00', 'Salida en bus a vender papel', 'Scranton', 1),
          ('Cueva1', '80.00', 'Espeleología', 'Cueva de Valporquero', 2),
          ('Cueva2', '100.00', 'Espeleología ruta difícil', 'Cueva de Valporquero', 2),
          ('Rafting', '100.00', 'Rafting y churrasco', 'Río Sil', 2)
      `,
      );
      console.log('Datos insertados');


  } catch (error) {
      console.error(error.message);
      } finally {

      if(connection) connection.release;

      process.exit();
  }

}

main();