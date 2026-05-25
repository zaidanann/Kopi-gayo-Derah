import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Menu from '@/models/Menu';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const menu = await Menu.findById(params.id);
    if (!menu) return NextResponse.json({ success: false, error: 'Menu not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: menu });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch menu' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const menu = await Menu.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
    if (!menu) return NextResponse.json({ success: false, error: 'Menu not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: menu });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const menu = await Menu.findByIdAndDelete(params.id);
    if (!menu) return NextResponse.json({ success: false, error: 'Menu not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Menu deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete menu' }, { status: 500 });
  }
}
