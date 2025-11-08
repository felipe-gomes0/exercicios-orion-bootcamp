UPDATE alunos
SET curso_id = c.id                                    
FROM cursos c
WHERE alunos.nome = 'neymar'
    AND c.nome_curso = 'Física';