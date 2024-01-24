import { searchReviews } from '@/app/lib/actions/actions';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

// it's safer to create a route handler that fetches data from the CMS, if we do it in the client, we expose the CMS api also we need to make CMS api public meaning it's less secure
// this is a route handler that will be called from the client
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (query && query?.length > 0) {
    const reviews = await searchReviews(query);
    console.log('reviews', reviews);
    return NextResponse.json(reviews, { status: 200 });
  } else {
    return NextResponse.json({ error: 'No query provided' }, { status: 400 });
  }
}
