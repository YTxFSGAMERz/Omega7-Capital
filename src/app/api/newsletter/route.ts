import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check for existing subscription
    const existing = await db.newsletterSubscription.findUnique({
      where: { email: trimmedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'You are already subscribed. Thank you!' },
        { status: 200 }
      );
    }

    // Store in database
    await db.newsletterSubscription.create({
      data: { email: trimmedEmail },
    });

    return NextResponse.json(
      { message: 'Thank you for subscribing to our newsletter.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
