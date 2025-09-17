import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.CMS_URL;

const handleRequest = async (
  request: NextRequest,
  params: Promise<{ slug: string[] }>,
  method: string
) => {
  try {
    const resolvedParams = await params;
    const cmsPath = `/${resolvedParams.slug.join('/')}`;
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${cmsPath}?${queryString}` : cmsPath;

    const fetchOptions: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 },
    };
    if (['POST', 'PUT'].includes(method)) {
      fetchOptions.body = JSON.stringify(await request.json());
    }

    const response = await fetch(`${process.env.CMS_URL}/api${fullPath}`, fetchOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`CMS Proxy Error (${method}):`, error);
    return NextResponse.json(
      { error: `Failed to ${method.toLowerCase()} CMS` },
      { status: 500 }
    );
  }
};

export const GET = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'GET');
export const POST = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'POST');
export const PUT = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'PUT');
export const DELETE = (req: NextRequest, context: { params: Promise<{ slug: string[] }> }) =>
  handleRequest(req, context.params, 'DELETE');