SELECT
    a.nome AS nome_do_aluno,
    c.nome_curso
FROM 
    aluno a
INNER JOIN 
    cursos c ON a.curso_id = c.id
WHERE 
    c.nome_curso = "Matemática";