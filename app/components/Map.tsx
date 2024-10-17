import React, { useEffect, useRef, useState } from "react";

const DEFAULT = {
  CENTER: {
    lat: 34.8345377,
    lng: 133.9297555,
  },
  ZOOM: 8.5,
} as const;

const VIEW_STYLE = {
  width: "100%",
  aspectRatio: "16 / 9",
};

export default function Map({ children }) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (ref.current && !map) {
      const options = {
        mapId: env.VITE_GOOGLE_MAP_ID,
        center: DEFAULT.CENTER,
        zoom: DEFAULT.ZOOM,
        streetViewControl: false,
        mapTypeControl: false,
      };
      setMap(new window.google.maps.Map(ref.current, options));
      infoWindowRef.current = new google.maps.InfoWindow();
    }
  }, [map]);

  return (
    <div style={VIEW_STYLE} ref={ref}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map, infoWindowRef });
        }
      })}
    </div>
  );
}
