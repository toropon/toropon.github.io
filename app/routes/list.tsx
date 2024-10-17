import { useEffect, useState, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/Map";
import Marker from "../components/Marker";
import ShopCard from "../components/ShopCard";
import shopData from "../data/shopList.json";
import prefList from "../data/pref.json";
import { Accordion, Center, Button, Stack } from "@mantine/core";
import { ShopInfo } from "../interfaces/interface";

export default function List() {
  const [shopList, setShopList] = useState<ShopInfo[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    // 都道府県名を補完する
    shopData.forEach((shop) => {
      const matchingPref = prefList.find((pref) => pref.code === shop.pref);
      if (matchingPref) {
        shop.prefName = matchingPref.name;
      } else {
        shop.prefName = "";
      }
    });

    setShopList(shopData);
  }, []);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  const renderMap = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const totalCount = shopList.filter((shop) => !shop.closed).length;
  const visitCount = shopList.filter(
    (shop) => !shop.closed && shop.visited
  ).length;

  return (
    <>
      <Center mt="30">
        <Stack align="strech" gap="xs">
          <Wrapper
            apiKey={import.meta.env.VITE_GOOGLE_MAP_APIKEY}
            render={renderMap}
            libraries={["marker"]}
          >
            <Map>
              {shopList.map((shop) => (
                // <>
                //   <Marker shopInfo={shop} key={shop.code} />
                //   <CustomMarker options={shop.loc} map={map} />
                // </>
                // <CustomMarker options={shop.loc} map={map} />
                <Marker shopInfo={shop} key={shop.code} />
              ))}
            </Map>
          </Wrapper>
          {visitCount} / {totalCount}
          <Accordion w={1000} variant="contained">
            <Accordion.Item value="open">
              <Accordion.Control>zag</Accordion.Control>
              <Accordion.Panel>
                {shopList.map((shop) => (
                  <ShopCard shopInfo={shop} key={shop.code} />
                ))}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Center>
    </>
  );
}
