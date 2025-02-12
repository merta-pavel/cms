import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/libs/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await auth();

  const { title, content, tags } = await req.json();
  console.log(tags);
  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        authorId: session?.user?.id || "",
      },
    });

    for (const tagName of tags) {
      console.log('Processing tag:', tagName);
      let tag = await prisma.tag.findUnique({
        where: { name: tagName },
      });

      if (!tag) {
        console.log('Creating tag:', tagName);
        tag = await prisma.tag.create({
          data: { name: tagName },
        });
      }

      await prisma.article.update({
        where: { id: article.id },
        data: {
          tags: {
            connect: { id: tag.id },
          },
        },
      });
    }

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Error creating article' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  console.log(userId);
  try {
    const articles = userId
      ? await prisma.article.findMany({
          where: {
            authorId: session?.user?.id,
          },
        })
      : await prisma.article.findMany();

    return NextResponse.json(articles, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 });
  }
}