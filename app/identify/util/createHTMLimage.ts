const createHTMLImageElement = (imageSrc: string) => {
  return new Promise<HTMLImageElement>((resolve) => {
    const img = new Image();

    img.onload = () => resolve(img);

    img.src = imageSrc;
  });
};

export default createHTMLImageElement;
