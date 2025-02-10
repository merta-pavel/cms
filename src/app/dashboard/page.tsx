"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';
import Link from "next/link";
const prisma = new PrismaClient();

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [articles, setArticles] = useState<{ id: number; title: string; content: string; tags: string[] }[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const tagsArray = tags.map((tag: string) => tag.trim()).filter(tag => tag);
      if (tagsArray.length >= 5) {
        alert('You can only add up to 5 tags.');
        return;
      }
      e.preventDefault();
      console.log(tagInput);
      if (tagInput.trim()) {
        setTags([...tags, tagInput.trim()]);
        console.log(tags);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  useEffect(() => {
    console.log(session?.user?.id);
    const fetchArticles = async () => {
      const response = await fetch('/api/articles?userId=' + session?.user?.id);
      const data = await response.json();
      console.log(data);
      setArticles(data);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign/in");
    }
  }, [status, router]);

  const addArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`/api/articles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, tags }),
    });
    setTitle('');
    setContent('');
    setTags([]);
    window.location.reload();
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Dashboard</h1>
        <Link href="/">
          <button className="btn btn-primary">Na hlávní stránku</button>
        </Link>
      </header>
      <main>
        <section className="section">
          <h2 className="subtitle">Přidat článek</h2>
          <form onSubmit={addArticle} className="form">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="form-textarea"
            />
            <input
              type="text"
              placeholder="Tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              className="form-input"
            />
            <div className="Tagscontainer">
              {tags.map((tag, index) => (
                <div key={index} className="Tag" onClick={() => removeTag(tag)}>
                  <p className="TagText">{tag}</p>
                </div>
              ))}
            </div>
            
            <button type="submit" className="btn btn-primary">Přidat článek</button>
          </form>
        </section>
        <h2 className="subtitle">Moje články</h2>
        <ul className="articles">
          {articles.map(article => (
              <li key={article.id} className="article-item">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-content">{article.content}</p>
                <p className="article-tags">
                  {article.tags?.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </p>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
}