import { NextRequest, NextResponse } from 'next/server';
import { submitConsultationAction } from '../../actions/submit-consultation';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const result = await submitConsultationAction(formData);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
