// Consulta para retornar apenas posts onde o autor seja "Felipe Gomes"

use('orion_posts_db');

db.posts.find({ autor: "Felipe Gomes" });

