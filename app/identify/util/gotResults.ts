const gotResults = async (
  error: unknown,
  results: { label: string; confidence: number }[]
) => {
  if (error) {
    console.log(error);
  }

  if (results) {
    const label = results[0].label; //Predicted label with highest confidence
    const confidence = results[0].confidence
      .toString()
      .split("")
      .splice(2, 2)
      .join("");
    return { label: label, confidence: Number(confidence) };
  }
};

export default gotResults;
