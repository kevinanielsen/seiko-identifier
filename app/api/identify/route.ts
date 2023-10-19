import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
const ml5 = require("ml5");

const modelURL = "https://teachablemachine.withgoogle.com/models/d1qL04bWG/";

interface IBody {
  image: HTMLImageElement;
}

interface IResult {
  label: string;
  confidence: number;
}

export default async function POST(req: NextRequest, res: NextResponse) {
  const body: IBody = await req.json();
  const imageToClassify = body.image;

  const classifier = await ml5.imageClassifier(modelURL + "model.json");

  const refList: string[] = await axios.get("/api/watch/refs");

  let result: IResult;

  const classifyImage = (imgSrc: HTMLImageElement) => {
    if (imgSrc) {
      try {
        classifier.classify(imgSrc, (error: any, results: IResult[]) => {
          if (error) return error;

          const label = results[0].label;
          const confidence = results[0].confidence
            .toString()
            .split("")
            .splice(2, 2)
            .join("");

          if (refList.includes(label)) {
            result = { label: label, confidence: Number(confidence) };
            axios
              .get(`/api/watch/${label}/updateRecognizable`)
              .catch((err: any) => console.log(err));
          }
          return result;
        });
      } catch (error: any) {
        console.log(error);
        return error;
      }
    }
  };
}
