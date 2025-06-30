import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { sessionId, rating, feedback, messageId } = await request.json();

    // Here you would save to your database
    // await db.chatFeedback.create({
    //   data: {
    //     sessionId,
    //     rating,
    //     feedback,
    //     messageId,
    //     timestamp: new Date()
    //   }
    // })

    return NextResponse.json({
      success: true,
      message:
        'Cảm ơn bạn đã đánh giá! Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Không thể lưu phản hồi' },
      { status: 500 }
    );
  }
}
