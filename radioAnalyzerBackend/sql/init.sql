use radioanalyzer;
create table audio(
    id int primary key AUTO_INCREMENT,
    name varchar(50) not null,
    location varchar(100) not null,
    estado int(1) not null,
    created_at datetime
);