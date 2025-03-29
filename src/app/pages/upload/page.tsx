"use client";
import { useState, useEffect, useRef } from "react";

import "./page.css";
import { Button } from "@/components/ui/button";
import abcLogo from "@/assets/logo-abc.png";

import { dataURLToBlob } from "@/app/utils";
import CategorySelect from "./components/categoryselect/CategorySelect";
import InputCustom from "./components/input/InputCustom";
import { InputFile } from "./components/input/InputFile";
import { CheckboxCustom } from "@/app/api/ui/CheckboxCustom";

interface Canvas {
  img: HTMLImageElement;
  offsetX: number;
  offsetY: number;
  scaleWidth: number;
  scaleHeight: number;
}

const URL_ABC_API_UPLOAD_IMAGE = process.env.NEXT_PUBLIC_ABC_API_UPLOAD_IMAGE;

export default function Upload() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [image, setImage] = useState<Canvas>();
  const [logo, setLogo] = useState<Canvas>();
  const [author, setAuthor] = useState<string>("Alberto Tejedor");
  const [isInternational, setIsInternational] = useState<number>(0);
  const [company, setCompany] = useState<string>("");
  const [bodywork, setBodywork] = useState<string>("");
  const [chassis, setChassis] = useState<string>("");
  const [serial, setSerial] = useState<string>("");
  const [location, setLocation] = useState<string>("Bogotá D.C.");
  const [country, setCountry] = useState<string>("Colombia");
  const [plate, setPlate] = useState<string>("");
  const [service, setService] = useState<string>("");
  
  const [category, setCategory] = useState<string>("");
  const [carType, setCarType] = useState<string>("");
  
  console.log(category);
  console.log(carType);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function clearCanvas1(
      canvas: HTMLCanvasElement | undefined,
      ctx: CanvasRenderingContext2D | undefined
    ) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    clearCanvas1(canvas, ctx);
  }, [canvas, ctx, loading]);

  function handleDrawCanvasImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      setCanvas(canvas);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      setCtx(ctx);

      let heightImageCanvas = 0;

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
        });
      };

      const imgLogo = new Image();
      imgLogo.onload = () => {
        ctx.drawImage(
          imgLogo,
          0,
          heightImageCanvas - imgLogo.height,
          imgLogo.width,
          imgLogo.height
        );

        setLogo({
          img: imgLogo,
          offsetX: 0,
          offsetY: heightImageCanvas - imgLogo.height,
          scaleWidth: imgLogo.width,
          scaleHeight: imgLogo.height,
        });
      };

      imgLogo.src = abcLogo.src;
      img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  function uploadDrawCanvas(
    image: Canvas | undefined,
    logo: Canvas | undefined,
    author: string,
    municipality: string,
    country: string,
    ctx: CanvasRenderingContext2D | undefined,
    canvas: HTMLCanvasElement | undefined
  ) {
    if (
      !image ||
      !logo ||
      !author ||
      !municipality ||
      !country ||
      !ctx ||
      !canvas
    )
      return;

    const location = `${municipality} - ${country}`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      image.img,
      image.offsetX,
      image.offsetY,
      image.scaleWidth,
      image.scaleHeight
    );

    ctx.globalAlpha = 1;
    ctx.drawImage(
      logo.img,
      logo.offsetX,
      logo.offsetY,
      logo.scaleWidth,
      logo.scaleHeight
    );

    const gradient = ctx.createLinearGradient(
      canvas.width - 300,
      canvas.height - 25,
      canvas.width,
      canvas.height - 150
    );

    gradient.addColorStop(1, "rgba(255,255,255, 0.5)");
    gradient.addColorStop(0, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(canvas.width - 500, canvas.height - 50, 500, 50);

    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.font = "22px arial";
    ctx.fillText("©", canvas.width - 20, canvas.height - 26, 400);
    ctx.font = "22px mitr";
    ctx.fillText(author, canvas.width - 45, canvas.height - 26, 400);
    ctx.font = "18px mitr";
    ctx.fillText(location, canvas.width - 22, canvas.height - 5, 400);
  }

  function clearCanvas(
    canvas: HTMLCanvasElement | undefined,
    ctx: CanvasRenderingContext2D | undefined
  ) {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleDownLoadImage(canvas: HTMLCanvasElement | undefined) {
    if (!canvas) return;
    const dataURL = canvas.toDataURL("image/webp");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image.webp";
    link.click();
  }

  async function handleUploadImage(canvas: HTMLCanvasElement | undefined) {
    if (!canvas) return;
    const dataURL = canvas.toDataURL("image/webp");
    const imageBlob = dataURLToBlob(dataURL);
    if (!imageBlob) return;

    const formData = new FormData();
    formData.append("image", imageBlob, "image.webp");
    formData.append("isInternational", isInternational.toString());
    formData.append("category", category.toLowerCase());
    formData.append("type", carType.toLowerCase());
    formData.append("company", company.toLowerCase());
    formData.append("serial", serial.toLowerCase());
    formData.append("bodywork", bodywork.toLowerCase());
    formData.append("chassis", chassis.toLowerCase());
    formData.append("plate", plate.toLowerCase());
    formData.append("service", service.toLowerCase());
    formData.append("author", author.toLowerCase());
    formData.append("country", country.toLowerCase());
    formData.append("location", location.toLowerCase());

    try {
      setLoading(true);
      const response = await fetch(
        URL_ABC_API_UPLOAD_IMAGE || "http://localhost:3001/photos/image",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Respuesta del Servidor", result);
    } catch (error) {
      console.error("Error al enviar la imagen", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-container">
      <div className="upload-form">
        <InputFile handleChange={handleDrawCanvasImage} />
        <InputCustom
          value={setAuthor}
          labelText="Fotografo"
          placeholder="Alberto Tejedor"
        />
        <CheckboxCustom setValue={setIsInternational} />
        <InputCustom
          value={setLocation}
          labelText="Ciudad"
          defaultValue={location}
        />
        <InputCustom
          value={setCountry}
          labelText="Pais"
          defaultValue={country}
        />
        <InputCustom
          value={setCompany}
          labelText="Empresa"
          placeholder="Autobuses de Colombia"
        />
        <InputCustom
          value={setSerial}
          labelText="Serial de la empresa"
          placeholder="2025"
        />
        <InputCustom
          value={setBodywork}
          labelText="Carroceria"
          placeholder="Marcopolo"
        />
        <InputCustom
          value={setChassis}
          labelText="Chasis"
          placeholder="Mercedez Benz"
        />
        <InputCustom value={setPlate} labelText="Placa" placeholder="ABC-123" />
        <InputCustom
          value={setService}
          labelText="Servicio"
          placeholder="Viajando por Colombia"
        />
        <CategorySelect setValue={setCategory} type="category" />
        <CategorySelect setValue={setCarType} type="carType" />

        <Button
          onClick={() =>
            uploadDrawCanvas(
              image,
              logo,
              author,
              location,
              country,
              ctx,
              canvas
            )
          }
        >
          Agregar autor
        </Button>
        <div>
          <Button onClick={() => handleUploadImage(canvas)}>
            Subir imagen
          </Button>
        </div>
        <Button onClick={() => handleDownLoadImage(canvas)}>
          Descargar imagen
        </Button>

        <Button onClick={() => clearCanvas(canvas, ctx)}>Limpiar</Button>
      </div>

      <div className="upload-canvas">
        <canvas id="canvas" ref={canvasRef} width="300" height="200"></canvas>
      </div>
    </div>
  );
}
