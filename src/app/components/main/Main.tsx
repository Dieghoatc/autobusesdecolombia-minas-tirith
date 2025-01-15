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

export default function Main() {
  const { data, loading } = useHookFetch(autobusesApiAdapter);

  const itemsSkeleton = 30;
  const array = generateArray(itemsSkeleton);
  
  if (loading && !loading) {
    return (
      <div className="sketelon-container">
        {array.map((item) => (
          <div key={item}>
            <Skeleton className="skeleton-image" />
            <Skeleton className="skeleton-detail" />
          </div>
        ))}
      </div>
    );
  }
  if (!data) {
    return <div>No data</div>;
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
