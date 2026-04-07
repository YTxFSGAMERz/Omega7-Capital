import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    // Store in database
    await db.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject?.trim() || null,
        message: message.trim(),
      },
    });

    return NextResponse.json(
      { message: 'Thank you for your message. We will get back to you shortly.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
