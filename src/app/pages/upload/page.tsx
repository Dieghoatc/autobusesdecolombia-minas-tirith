"use client";
import { useState, useRef } from "react";

import "./page.css";
import { Button } from "@/components/ui/button";
import abcLogo from "@/assets/logo-abc.png";

interface Canvas {
  img: HTMLImageElement;
  offsetX: number;
  offsetY: number;
  scaleWidth: number;
  scaleHeight: number;
}

const URL_ABC_API = process.env.NEXT_PUBLIC_ABC_API

export default function Upload() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<Canvas>()
  const [logo, setLogo] = useState<Canvas>()
  const [author, setAuthor] = useState<string>("Alberto Tejedor")
  const [company, setCompany] = useState<string>("")
  const [bodywork, setBodywork] = useState<string>("")
  const [chassis, setChassis] = useState<string>("")
  const [serial, setSerial] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
  const [canvas, setCanvas] = useState<HTMLCanvasElement>()

  

  function handelUploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      setCanvas(canvas);
      const ctx = canvas.getContext("2d");
      if(!ctx) return;
      setCtx(ctx);

      let heightImageCanvas = 0

      const img = new Image();
      img.onload = () => {
        const maxWidth = 1920; //1280 x 720
        const aspectRatio = img.width / img.height;
        const newHeight = maxWidth / aspectRatio;
        heightImageCanvas = newHeight;

        canvas.width = maxWidth;
        canvas.height = newHeight;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        setImage({
          img: img,
          offsetX: 0,
          offsetY: 0,
          scaleWidth: canvas.width,
          scaleHeight: canvas.height,
        })
      };

      const imgLogo = new Image();
      imgLogo.onload = () => {
        ctx.drawImage(imgLogo, 0, heightImageCanvas - imgLogo.height, imgLogo.width, imgLogo.height);

        setLogo({
          img: imgLogo,
          offsetX: 0,
          offsetY: heightImageCanvas - imgLogo.height,
          scaleWidth: imgLogo.width,
          scaleHeight: imgLogo.height,
        })

      };

      imgLogo.src = abcLogo.src;
      img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  }
  

  function uploadDrawCanvas(image: Canvas | undefined, logo: Canvas | undefined, author: string | undefined, description: string | undefined,  ctx: CanvasRenderingContext2D | undefined, canvas: HTMLCanvasElement | undefined) {

    if (!image || !logo || !author || !description || !ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(image.img, image.offsetX, image.offsetY, image.scaleWidth, image.scaleHeight);
    
    ctx.globalAlpha = 1;
    ctx.drawImage(logo.img, logo.offsetX, logo.offsetY, logo.scaleWidth, logo.scaleHeight);

    const gradient = ctx.createLinearGradient(
      canvas.width - 300,
      canvas.height - 25,
      canvas.width,
      canvas.height - 150
    )

    gradient.addColorStop(1, 'rgba(255,255,255, 0.5)')
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(canvas.width - 500, canvas.height - 50, 500, 50)

    ctx.fillStyle = "white"
    ctx.textAlign = "right"
    ctx.font = "22px arial"
    ctx.fillText("©", canvas.width - 20, canvas.height - 26, 400)
    ctx.font = "22px mitr"
    ctx.fillText(author, canvas.width - 45, canvas.height - 26, 400)    
    ctx.font = "18px mitr" 
    ctx.fillText(description, canvas.width - 22, canvas.height - 5, 400) 
  }

  function handleDownLoadImage( canvas: HTMLCanvasElement | undefined) {
  
    if(!canvas) return
    const dataURL = canvas.toDataURL("image/webp")
    const link = document.createElement("a")
    link.href = dataURL
    link.download = "image.webp"
    link.click()
  }

  async function handleUploadImage(canvas: HTMLCanvasElement | undefined) {
    if(!canvas) return
    const dataURL = canvas.toDataURL("image/webp")

    const formData = new FormData()
    formData.append("image", dataURL)
    formData.append("author", author.toLowerCase())
    formData.append("company", company.toLowerCase())
    formData.append("bodywork", bodywork.toLowerCase())
    formData.append("engine", chassis.toLowerCase())
    formData.append("serial", serial.toLowerCase())
    formData.append("description", description.toLowerCase())
    

    try {
      const response = await fetch( URL_ABC_API || "http://localhost:3001/photos/image", {
        method: "POST",
        body: formData
      })
      
      const result = await response.json()
      console.log("Respuesta del Servidor", result)

    } catch (error) {
      console.error("Error al enviar la imagen", error)
    }    
  }

  return (
    <div>
      <div className="control-container">
        <input type="file" accept="image/*" onChange={handelUploadImage} />
        <input type="text" placeholder="Alberto Tejedor" onChange={(event) => setAuthor(event.target.value)}  />
        <input type="text" placeholder="Bogotá - Colombia" maxLength={35} onChange={(event => setDescription(event.target.value))} />
        <input type="text" placeholder="Empresa" maxLength={20} onChange={(event => setCompany(event.target.value))} />
        <input type="text" placeholder="Serial" maxLength={20} onChange={(event => setSerial(event.target.value))} />
        <input type="text" placeholder="Carroceria" maxLength={20} onChange={(event => setBodywork(event.target.value))} />
        <input type="text" placeholder="Chasis" maxLength={20} onChange={(event => setChassis(event.target.value))} />
        <Button variant="secondary" onClick={() => uploadDrawCanvas(image, logo, author, description, ctx, canvas)}>Agregar autor</Button>
        <Button variant="secondary" onClick={() => handleDownLoadImage(canvas)}>Descargar imagen</Button>
        <Button variant="secondary" onClick={() => handleUploadImage(canvas)}>Subir imagen</Button>
      </div>
      <div className="canvas-container">
        <canvas id="canvas" ref={canvasRef} width="300" height="200"></canvas>
      </div>
    </div>
  );
}
