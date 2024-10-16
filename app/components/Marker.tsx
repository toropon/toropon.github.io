import { useEffect, useState } from "react";
import { StoreType, ShopInfo } from "../interfaces/interface";

const IMAGE_VISITED = "./images/zagface_g.png";
const IMAGE_NOTVISITED = "./images/zagface_r.png";
const IMAGE_CLOSED = "./images/zagface_gray.png";
const IMAGE_HEADOFFICE = "./images/zagface_b.png";
const IMAGE_PHARMACY = "./images/zagface_o.png";

const MARKER_IMAGE_VISITED = "./images/marker/visited.png";
const MARKER_IMAGE_NOTVISITED = "./images/marker/notvisited.png";
const MARKER_IMAGE_CLOSED = "./images/marker/closed.png";
const MARKER_IMAGE_HEADOFFICE = "./images/marker/headoffice.png";
const MARKER_IMAGE_PHARMACY = "./images/marker/pharmacy.png";

export default function Marker({ map, shopInfo, infoWindowRef }) {
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  // const imageUrl = shopInfo.closed
  //   ? IMAGE_CLOSED
  //   : shopInfo.storeType == StoreType.HeadOffice
  //   ? IMAGE_HEADOFFICE
  //   : shopInfo.visited
  //   ? IMAGE_VISITED
  //   : shopInfo.storeType == StoreType.Pharmacy
  //   ? IMAGE_PHARMACY
  //   : IMAGE_NOTVISITED;

  // const markerImageUrl = shopInfo.closed
  //   ? MARKER_IMAGE_CLOSED
  //   : shopInfo.storeType == StoreType.HeadOffice
  //   ? MARKER_IMAGE_HEADOFFICE
  //   : shopInfo.visited
  //   ? MARKER_IMAGE_VISITED
  //   : shopInfo.storeType == StoreType.Pharmacy
  //   ? MARKER_IMAGE_PHARMACY
  //   : MARKER_IMAGE_NOTVISITED;

  const imagesMap = {
    closed: {
      image: IMAGE_CLOSED,
      marker: MARKER_IMAGE_CLOSED,
    },
    headOffice: {
      image: IMAGE_HEADOFFICE,
      marker: MARKER_IMAGE_HEADOFFICE,
    },
    visited: {
      image: IMAGE_VISITED,
      marker: MARKER_IMAGE_VISITED,
    },
    pharmacy: {
      image: IMAGE_PHARMACY,
      marker: MARKER_IMAGE_PHARMACY,
    },
    default: {
      image: IMAGE_NOTVISITED,
      marker: MARKER_IMAGE_NOTVISITED,
    },
  };

  function getImages(shopInfo: ShopInfo) {
    if (shopInfo.closed) return imagesMap.closed;
    if (shopInfo.storeType === StoreType.HeadOffice)
      return imagesMap.headOffice;
    if (shopInfo.visited) return imagesMap.visited;
    if (shopInfo.storeType === StoreType.Pharmacy) return imagesMap.pharmacy;
    return imagesMap.default;
  }

  const { image: imageUrl, marker: markerImageUrl } = getImages(shopInfo);

  useEffect(() => {
    if (!marker && map) {
      const markerImg = document.createElement("img");
      markerImg.src = markerImageUrl;
      markerImg.width = 50;

      const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: shopInfo.loc,
        content: markerImg,
      });

      setMarker(advancedMarker);
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [map, marker, shopInfo]);

  useEffect(() => {
    if (marker) {
      const headerContentString =
        `<div style="display: flex; justify-content: space-between; align-items: flex-start;">` +
        `<div style="font-size:1.4rem;text-decoration:underline;text-underline-offset:3px;text-decoration-color:gray;">` +
        shopInfo.name +
        (shopInfo.closed ? "(閉店)" : "") +
        `</div>` +
        `<img src=${imageUrl} width=40 />` +
        `</div>`;

      const headerElement = document.createElement("div");
      headerElement.innerHTML = headerContentString;
      const contentString =
        `<div style="width:300px; display: flex; justify-content: space-between; align-items: center;">` +
        `<div>` +
        `${shopInfo.code}<br>` +
        `${shopInfo.prefName}${shopInfo.address}<br>` +
        `</div>` +
        `</div>`;

      marker.addListener("click", () => {
        infoWindowRef.current?.setOptions({
          headerContent: headerElement,
          content: contentString,
        });
        infoWindowRef.current?.open(map, marker);
      });
    }
  }, [marker, shopInfo, infoWindowRef, map]);

  return null;
}
