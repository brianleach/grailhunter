import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "30"), 100);

  const activities = await prisma.activity.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      item: { select: { id: true, name: true, status: true } },
    },
  });

  return NextResponse.json(activities);
}
