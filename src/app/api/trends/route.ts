import { NextRequest, NextResponse } from 'next/server';
import { exploreTrends } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { category } = await request.json();

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const data = await exploreTrends(category);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
