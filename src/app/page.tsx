import Link from "next/link";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function Home() {
  const articles = await prisma.article.findMany();

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Hlavní stránka</h1>
        <div className="nav">
          <div><Link href="/sign/in">Přihlásit se</Link></div>
          <div><Link href="/dashboard">Dashboard</Link></div>
        </div>

      </header>
      <main>
        <section className="section">
          <h2 className="subtitle">Články</h2>
          <ul className="articles">
            {articles.map(article => (
              <li key={article.id} className="article-item">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-content">{article.content}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
