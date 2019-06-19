use radioanalyzer;
create table audio(
    id int primary key AUTO_INCREMENT,
    name varchar(50) not null,
    location varchar(100) not null,
    estado int not null,
    duracion int,
    created_at datetime
);

create table particion(
    id int primary key AUTO_INCREMENT,
    idaudio int not null,
    numeroparticion int not null,
    folder varchar(50) not null,
    filename varchar(50) not null,
    estado int not null,
    clase varchar(50) not null DEFAULT "Sin asignar",
    created_at datetime,
    FOREIGN KEY (idaudio) REFERENCES audio(id)
);