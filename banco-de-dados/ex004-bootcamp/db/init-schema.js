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
  tags: ["schema", "flexivel", "infinito", "nosql"]
});

db.posts.updateOne(
  { titulo: "Adicionando primeiro post" },
  {
    $set: {
      comentarios: [
        {
          autor: "João Silva",
          texto: "Excelente post! Muito informativo.",
          data: new Date("2025-11-03")
        },
        {
          autor: "Maria Santos",
          texto: "Gostei muito do conteúdo, obrigado por compartilhar.",
          data: new Date("2025-11-01")
        },
        {
          autor: "Pedro Costa",
          texto: "Tem mais informações sobre esse assunto?",
          data: new Date("2025-11-02")
        }
      ]
    }
  }
);

db.posts.find();

