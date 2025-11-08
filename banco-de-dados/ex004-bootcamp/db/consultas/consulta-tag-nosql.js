// Consulta para retornar apenas posts com a tag "nosql"

use('orion_posts_db');

db.posts.find({ tags: "nosql" });

