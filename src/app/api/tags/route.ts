import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Získání všech tagů
export async function GET() {
  const tags = await prisma.tag.findMany();
  return NextResponse.json(tags);
}

// Vytvoření tagu
export async function POST(req: Request) {
  const { name } = await req.json();
  const tag = await prisma.tag.create({ data: { name } });
  return NextResponse.json(tag);
}