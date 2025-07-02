export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"; 

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const product = await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
