"use client";

import { useState, useEffect } from "react";

import { autobusesApiAdapter } from "../../api/autobusesApi.adapter";
import { PhotoApiResponse } from "../../api/autobusesApi.adapter";

import Card from "./components/Card/Card";
import "./main.css";

export default function Main() {
  const [data, setData] = useState([]);

  useEffect(() => {
    autobusesApiAdapter().then((data) => setData(data));
  }, []);

  return (
    <div className="main-container">
      <div className="cards-container">
        {data.map((photo: PhotoApiResponse) => (
          <Card photo={photo} key={photo.photo_id} />
        ))}
      </div>
    </div>
  );
}
