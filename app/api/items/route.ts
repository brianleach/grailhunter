import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");

  const items = await prisma.item.findMany({
    where: status ? { status: status as never } : undefined,
    orderBy: { updatedAt: "desc" },
    include: {
      priceHistory: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const item = await prisma.item.create({
    data: {
      name: body.name,
      source: body.source ?? "",
      sourceUrl: body.sourceUrl ?? "",
      imageUrl: body.imageUrl ?? "",
      category: body.category ?? "Other",
      targetPrice: body.targetPrice ?? null,
      currentPrice: body.currentPrice ?? null,
      notes: body.notes ?? "",
      status: body.status ?? "WATCHING",
    },
  });

  await prisma.activity.create({
    data: {
      type: "ITEM_ADDED",
      message: `Added "${item.name}" to watchlist`,
      itemId: item.id,
    },
  });

  if (body.currentPrice != null) {
    await prisma.priceHistory.create({
      data: {
        price: body.currentPrice,
        source: body.source ?? "",
        itemId: item.id,
      },
    });
  }

  return NextResponse.json(item, { status: 201 });
}
