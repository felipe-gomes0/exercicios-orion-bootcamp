// Consulta para retornar posts com comentários de um autor específico

use('orion_posts_db');

db.posts.find({ "comentarios.autor": "João Silva" });

