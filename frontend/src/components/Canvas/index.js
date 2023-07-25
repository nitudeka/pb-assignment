import { useEffect, useRef } from "react";
import renderCanvas from "./render-canvas";

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    renderCanvas(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default Canvas;
