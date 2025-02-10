import { prisma } from "@/lib/prisma";

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({
    where: { id: Number(params.id) },
    include: { author: true, tags: true },
  });

  if (!article) return <p>Článek nenalezen</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p><strong>Autor:</strong> {article.author.email}</p>
      <p><strong>Tagy:</strong> {article.tags.map((tag) => tag.name).join(", ")}</p>
    </div>
  );
}
