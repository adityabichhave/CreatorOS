import { NextRequest, NextResponse } from 'next/server';
import { analyzeCompetitor } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { videoUrl, additionalContext } = await request.json();

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    const data = await analyzeCompetitor(videoUrl, additionalContext);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
