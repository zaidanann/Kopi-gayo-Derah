import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Menu from '@/models/Menu';
import Service from '@/models/Service';
import About from '@/models/About';
import ContactMessage from '@/models/ContactMessage';

export async function GET() {
  try {
    await connectDB();
    const [menuCount, serviceCount, messageCount, unreadCount, aboutCount] = await Promise.all([
      Menu.countDocuments(),
      Service.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      About.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: { menuCount, serviceCount, messageCount, unreadCount, aboutCount },
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}
