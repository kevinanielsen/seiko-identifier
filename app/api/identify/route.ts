import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import classifyImage from "tfjs-image-node";

const modelURL = "https://teachablemachine.withgoogle.com/models/d1qL04bWG";

interface IBody {
  image: string;
}

interface IResult {
  label: string;
  probability: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const metadataRes = await axios.get(
    "https://teachablemachine.withgoogle.com/models/d1qL04bWG/metadata.json"
  );
  const metadata = await metadataRes.data;
  try {
    const body: IBody = await req.json();
    const imageToClassify = body.image;

    if (!imageToClassify)
      return NextResponse.json(
        { message: "ERR_MISSING_IMAGE" },
        { status: 400 }
      );

    const result: IResult[] | Error = await classifyImage(
      modelURL,
      imageToClassify,
      metadata
    );
    if (result instanceof Array) {
      return NextResponse.json(result[0], { status: 200 });
    } else {
      return NextResponse;
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
