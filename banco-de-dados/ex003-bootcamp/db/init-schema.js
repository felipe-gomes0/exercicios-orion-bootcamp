db = db.getSiblingDB('orion_posts_db'); // nomeando banco de dados 

db.posts.insertOne({
  titulo: "Adicionando primeiro post",
  autor: "Felipe Gomes",
  conteudo: "lorem ipsum dolor sit amet consectetur adipiscing elit dignissim habitasse ornare vehicula in montes suspendisse duis et pellentesque tellus imperdiet"
});

db.posts.insertOne({
  titulo: "Adicionando post com informação extra",
  autor: "Felipe Gomes",
  conteudo: "lorem ipsum dolor sit amet consectetur adipiscing elit dignissim habitasse ornare vehicula in montes suspendisse duis et pellentesque tellus imperdiet",
  tags: ["schema", "flexivel", "infinito"]
});

db.posts.find();


