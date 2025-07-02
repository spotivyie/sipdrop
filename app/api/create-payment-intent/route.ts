import { NextResponse } from "next/server";
export const runtime = 'nodejs';
export async function POST() {
  console.log('Test endpoint hit');
  console.log('DATABASE_URL:', !!process.env.DATABASE_URL);
  console.log('STRIPE_SECRET_KEY:', !!process.env.STRIPE_SECRET_KEY);
  return NextResponse.json({ ok: true });
}
