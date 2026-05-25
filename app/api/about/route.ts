import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import About from '@/models/About';

export async function GET() {
  try {
    await connectDB();
    const about = await About.findOne().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch about' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const about = await About.create(body);
    return NextResponse.json({ success: true, data: about }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const about = await About.findOneAndUpdate({}, body, { new: true, upsert: true, runValidators: true });
    return NextResponse.json({ success: true, data: about });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
