import { NextRequest, NextResponse } from 'next/server';
import { generateThumbnailConcepts } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const data = await generateThumbnailConcepts(body);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
