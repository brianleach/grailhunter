import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      priceHistory: { orderBy: { createdAt: "desc" }, take: 20 },
      activities: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.item.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const item = await prisma.item.update({
    where: { id },
    data: {
      ...(body.name !== undefined && { name: body.name }),
      ...(body.source !== undefined && { source: body.source }),
      ...(body.sourceUrl !== undefined && { sourceUrl: body.sourceUrl }),
      ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.targetPrice !== undefined && { targetPrice: body.targetPrice }),
      ...(body.currentPrice !== undefined && {
        currentPrice: body.currentPrice,
      }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.notes !== undefined && { notes: body.notes }),
    },
  });

  if (
    body.currentPrice !== undefined &&
    body.currentPrice !== existing.currentPrice
  ) {
    await prisma.priceHistory.create({
      data: {
        price: body.currentPrice,
        source: body.source ?? existing.source,
        itemId: id,
      },
    });

    const direction =
      body.currentPrice < (existing.currentPrice ?? Infinity)
        ? "dropped"
        : "increased";
    await prisma.activity.create({
      data: {
        type: "PRICE_CHANGE",
        message: `"${item.name}" price ${direction} to $${body.currentPrice}`,
        itemId: id,
      },
    });
  }

  if (body.status && body.status !== existing.status) {
    const labels: Record<string, string> = {
      WATCHING: "watching",
      ALERT: "alert",
      PURCHASED: "purchased",
      SOLD: "sold",
      ARCHIVED: "archived",
    };
    await prisma.activity.create({
      data: {
        type: "STATUS_CHANGE",
        message: `"${item.name}" marked as ${labels[body.status] ?? body.status}`,
        itemId: id,
      },
    });
  }

  return NextResponse.json(item);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  const existing = await prisma.item.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  await prisma.activity.create({
    data: {
      type: "ITEM_REMOVED",
      message: `Removed "${existing.name}" from watchlist`,
      itemId: null,
    },
  });

  await prisma.item.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
