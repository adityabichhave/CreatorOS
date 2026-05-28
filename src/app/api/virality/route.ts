import { NextRequest, NextResponse } from 'next/server';
import { analyzeVirality } from '@/lib/gemini';
import type { GeneratorInput } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GeneratorInput = await request.json();

    if (!body.videoTitle && !body.topic) {
      return NextResponse.json(
        { error: 'Video title or topic is required' },
        { status: 400 }
      );
    }

    const data = await analyzeVirality(body);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
