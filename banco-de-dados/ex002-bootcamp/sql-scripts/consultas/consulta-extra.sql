select
	c.nome_curso
from 
	cursos c
left join
	alunos a on c.id = a.curso_id 
where 
	a.id is null;