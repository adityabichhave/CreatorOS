import { NextRequest, NextResponse } from 'next/server';
import { generateCreatorContent } from '@/lib/gemini';
import type { GeneratorInput } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: GeneratorInput = await request.json();

    // Validate input
    if (!body.videoTitle && !body.topic) {
      return NextResponse.json(
        { error: 'Video title or topic is required' },
        { status: 400 }
      );
    }

    const content = await generateCreatorContent(body);

    return NextResponse.json({ success: true, data: content });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    console.error('[API /generate] Error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
