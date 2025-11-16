import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Логирование данных в консоль
    console.log("Contact form submission:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      criteria: data.criteria,
      consent: data.consent,
      timestamp: new Date().toISOString(),
    });

    // Здесь можно добавить отправку email, сохранение в БД и т.д.
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

