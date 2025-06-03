"use client";
import { useState, useEffect, useRef } from "react";

import "./page.css";
import { Button } from "@/components/ui/button";
import logox2 from "./logox2.png";

import { dataURLToBlob, deleteLastSpace } from "@/lib/helpers";
import CategorySelect from "./components/categoryselect/CategorySelect";
import InputCustom from "./components/input/InputCustom";
import { InputFile } from "./components/input/InputFile";
import { CheckboxCustom } from "@/services/api/ui/CheckboxCustom";
interface Canvas {
  img: HTMLImageElement;
  offsetX: number;
  offsetY: number;
  scaleWidth: number;
  scaleHeight: number;
}

const URL_ABC_API_UPLOAD_IMAGE = `${process.env.NEXT_PUBLIC_ABC_API}/photos/image`;

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

  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");

  function handleDrawCanvasImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

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
      imgLogo.src = logox2.src;

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

      img.src = event.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  function uploadDrawCanvas(
    image: Canvas | undefined,
    logo: Canvas | undefined,
    author: string,
    location: string,
    country: string,
  ) {
    if (!image || !logo || !author || !ctx || !canvas) return;

    let locationDescription = "";
    if (location) {
      locationDescription = `${deleteLastSpace(location)} - ${deleteLastSpace(
        country
      )}`;
    } else {
      locationDescription = `${deleteLastSpace(country)}`;
    }

    console.log(">>>>", logo);

    ctx.drawImage(
      logo.img,
      logo.offsetX,
      logo.offsetY,
      logo.scaleWidth,
      logo.scaleHeight
    );

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

    gradient.addColorStop(1, "rgba(128, 128, 128, 0.7)");
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
    ctx.fillText(
      locationDescription,
      canvas.width - 22,
      canvas.height - 5,
      400
    );
  }

  function clearCanvas() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function handleDownLoadImage() {
    if (!canvas) return;
    const dataURL = canvas.toDataURL("image/webp");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image.webp";
    link.click();
  }

  async function handleUploadImage() {
    if (!canvas) return;
    const dataURL = canvas.toDataURL("image/webp");
    const imageBlob = dataURLToBlob(dataURL);
    if (!imageBlob) return;

    const formData = new FormData();
    formData.append("image", imageBlob, "image.webp");
    formData.append("isInternational", isInternational.toString());
    formData.append("category", category.toLowerCase());
    formData.append("type", carType.toLowerCase());
    formData.append("company", deleteLastSpace(company.toLowerCase()));
    formData.append("serial", deleteLastSpace(serial.toLowerCase()));
    formData.append("bodywork", deleteLastSpace(bodywork.toLowerCase()));
    formData.append("chassis", deleteLastSpace(chassis.toLowerCase()));
    formData.append("plate", deleteLastSpace(plate.toLowerCase()));
    formData.append("service", deleteLastSpace(service.toLowerCase()));
    formData.append("author", deleteLastSpace(author.toLowerCase()));
    formData.append("country", deleteLastSpace(country.toLowerCase()));
    formData.append("location", deleteLastSpace(location.toLowerCase()));

    try {
      const response = await fetch(
        URL_ABC_API_UPLOAD_IMAGE || "http://localhost:3001/photos/image",
        {
          method: "POST",
          body: formData,
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Error al enviar la imagen", error);
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
            )
          }
        >
          Agregar autor
        </Button>
        <div>
          <Button onClick={() => handleUploadImage()}>
            Subir imagen
          </Button>
        </div>
        <Button onClick={() => handleDownLoadImage()}>
          Descargar imagen
        </Button>

        <Button onClick={() => clearCanvas()}>Limpiar</Button>
      </div>

      <div className="upload-canvas">
        <canvas id="canvas" ref={canvasRef} width="300" height="200"></canvas>
      </div>
    </div>
  );
}
