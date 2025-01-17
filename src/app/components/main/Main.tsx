"use client";

import { autobusesApiAdapter } from "../../api/autobusesApi.adapter";
import SkeletonComponent from "../skeleton/Skeleton";

import { useHookFetch } from "../../hooks/useHookFetch";
import "./main.css";
import Gallery from "../gallery/Gallery";

export default function Main() {
  const { data, loading } = useHookFetch(autobusesApiAdapter);

  if (loading) {
    return <SkeletonComponent />;
  }

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  return <Gallery data={data} />;
}
