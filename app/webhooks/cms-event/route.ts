import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  if (payload.model === 'review') {
    revalidateTag('review');
  }
  return new Response(null, { status: 204 });
}
