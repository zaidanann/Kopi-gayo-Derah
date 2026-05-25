import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactMessage from '@/models/ContactMessage';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const message = await ContactMessage.findById(params.id);
    if (!message) return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch message' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const message = await ContactMessage.findByIdAndUpdate(params.id, body, { new: true });
    if (!message) return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: message });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const message = await ContactMessage.findByIdAndDelete(params.id);
    if (!message) return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete message' }, { status: 500 });
  }
}
