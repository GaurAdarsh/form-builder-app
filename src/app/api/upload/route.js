import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs/promises";

// Handles only POST with FormData
export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Convert buffer to base64 string
    const base64Image = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "question-images",
      public_id: uuidv4(),
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
