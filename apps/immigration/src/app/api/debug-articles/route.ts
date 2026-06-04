import { NextResponse } from 'next/server';
import { getProviderForSection } from '@/lib/services/content';

export async function GET() {
  const provider = getProviderForSection('insights');
  if (!provider) return NextResponse.json({ error: 'no provider' });
  const articles = await provider.getArticles();
  return NextResponse.json({ articles });
}
