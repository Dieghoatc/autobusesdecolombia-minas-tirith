"use client";

import {
  autobusesApiAdapter,
  ApiResponse,
} from "../../api/autobusesApi.adapter";
import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "../../utils";

import Card from "./components/Card/Card";
import "./main.css";

import { useHookFetch } from "../../hooks/useHookFetch";

const SKELETON_ITEM_COUNT = 30;

export default function Main() {
  const { data, loading } = useHookFetch(autobusesApiAdapter);

  const skeletonItems = generateArray(SKELETON_ITEM_COUNT);

  if (loading) {
    return (
      <div className="sketelon-container">
        {skeletonItems.map((item) => (
          <div key={item}>
            <Skeleton className="skeleton-image" />
            <Skeleton className="skeleton-detail" />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles.</div>;
  }

  return (
    <div className="cards-container">
      {data.map((photo: ApiResponse) => (
        <div key={photo.photo_id}>
          <Card photo={photo} key={photo.photo_id} />
        </div>
      ))}
    </div>
  );
}
