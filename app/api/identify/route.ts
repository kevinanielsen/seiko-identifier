import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import classifyImage from "tfjs-image-node";

cloudinary.config({
  cloud_name: "seikoidentifier",
  api_key: "353591214627521",
  api_secret: process.env.IMAGE_API_KEY,
});

const modelURL = "https://teachablemachine.withgoogle.com/models/d1qL04bWG";

interface IResult {
  label: string;
  probability: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const image = body.image;
    if (image.length === 0)
      return NextResponse.json(
        { message: "ERR_MISSING_IMAGE" },
        { status: 400 }
      );

    const img = await cloudinary.uploader.upload(
      image,
      (error: any, result: any) => {
        if (error) {
          return NextResponse.json(error, { status: 500 });
        }
        return NextResponse.json(result);
      }
    );

    const result: IResult[] | Error = await classifyImage(modelURL, img.url);

    if (result instanceof Array) {
      return NextResponse.json(result[0], { status: 200 });
    } else {
      return NextResponse.json({}, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
