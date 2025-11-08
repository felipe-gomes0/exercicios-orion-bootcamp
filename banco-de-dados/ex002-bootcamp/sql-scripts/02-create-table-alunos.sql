CREATE TABlE IF NOT EXISTS alunos (
    id int not null primary key generated always as identity,
    nome varchar(255),
    email VARCHAR(255),
    curso_id  int not null, 
    CONSTRAINT fk_alunos_cursos 
    FOREIGN KEY (curso_id) 
    REFERENCES cursos (id)
);