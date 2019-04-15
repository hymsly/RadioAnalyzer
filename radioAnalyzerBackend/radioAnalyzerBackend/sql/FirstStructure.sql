-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2019-04-15 01:55:08.445

-- tables
-- Table: Equipo
CREATE TABLE Equipo (
    id int NOT NULL,
    nombre varchar(50) NOT NULL,
    estado int NOT NULL,
    UNIQUE INDEX Equipo_ak_1 (nombre),
    CONSTRAINT Equipo_pk PRIMARY KEY (id)
) COMMENT 'Equipo de futbol para la transmisión';

-- Table: Partido
CREATE TABLE Partido (
    id int NOT NULL,
    Equipo_id int NOT NULL,
    Equipo_2_id int NOT NULL,
    audio varchar(100) NOT NULL,
    fechaInicio timestamp NOT NULL,
    duracion int NOT NULL,
    estado int NOT NULL,
    estadoAsignacion int NOT NULL,
    CONSTRAINT Partido_pk PRIMARY KEY (id)
);

CREATE INDEX Partido_idx_1 ON Partido (Equipo_id);

-- Table: Radio
CREATE TABLE Radio (
    id int NOT NULL,
    nombre varchar(100) NOT NULL,
    enlace varchar(200) NOT NULL,
    estado int NOT NULL,
    CONSTRAINT Radio_pk PRIMARY KEY (id)
);

-- Table: Slogan
CREATE TABLE Slogan (
    id int NOT NULL,
    nombre varchar(50) NOT NULL,
    audio_base varchar(100) NOT NULL,
    CONSTRAINT Slogan_pk PRIMARY KEY (id)
) COMMENT 'Todos los tipos de Slogans emitidos durante transmisiones de radio';

-- Table: SloganPartido
CREATE TABLE SloganPartido (
    id int NOT NULL,
    Slogan_id int NOT NULL,
    Partido_id int NOT NULL,
    tiempoInicio int NOT NULL,
    duracion int NOT NULL,
    tipo_asignacion int NOT NULL,
    CONSTRAINT SloganPartido_pk PRIMARY KEY (id)
) COMMENT 'Registro de aparicion de un slogan durante un partido';

-- foreign keys
-- Reference: Partido_Equipo_1 (table: Partido)
ALTER TABLE Partido ADD CONSTRAINT Partido_Equipo_1 FOREIGN KEY Partido_Equipo_1 (Equipo_id)
    REFERENCES Equipo (id);

-- Reference: Partido_Equipo_2 (table: Partido)
ALTER TABLE Partido ADD CONSTRAINT Partido_Equipo_2 FOREIGN KEY Partido_Equipo_2 (Equipo_2_id)
    REFERENCES Equipo (id);

-- Reference: SloganPartido_Partido (table: SloganPartido)
ALTER TABLE SloganPartido ADD CONSTRAINT SloganPartido_Partido FOREIGN KEY SloganPartido_Partido (Partido_id)
    REFERENCES Partido (id);

-- Reference: SloganPartido_Slogan (table: SloganPartido)
ALTER TABLE SloganPartido ADD CONSTRAINT SloganPartido_Slogan FOREIGN KEY SloganPartido_Slogan (Slogan_id)
    REFERENCES Slogan (id);

-- End of file.

