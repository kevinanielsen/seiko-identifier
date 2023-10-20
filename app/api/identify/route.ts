import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const modelURL = "https://teachablemachine.withgoogle.com/models/d1qL04bWG/";

interface IBody {
  image: HTMLImageElement;
}

interface IResult {
  label: string;
  confidence: number;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body: IBody = await req.json();
  const imageToClassify = body.image;

  const refList: string[] = await axios.get("/api/watch/refs");

  let result: IResult;
}
