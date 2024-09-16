"use client";
import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Countries } from "@/app/create/[id]/_components/GetCountries";
import { icon } from "leaflet";
type LocationValueProps = {
  locationValue: string | undefined;
};

const Map = ({ locationValue }: LocationValueProps) => {
  const longLat = Countries();
  const locate = longLat.find((value) => {
    return value.name === locationValue;
  });
  const ICON = icon({
    iconUrl: "/location.png",
    iconSize: [50, 50],
  });
  return (
    <MapContainer
      scrollWheelZoom={false}
      zoom={8}
      center={locate?.latLang ?? [51.505, -0.09]}
      className="h-[50vh] rounded-lg relative z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={locate?.latLang ?? [51.505, -0.09]}
        icon={ICON}
      ></Marker>
    </MapContainer>
  );
};

export default Map;
