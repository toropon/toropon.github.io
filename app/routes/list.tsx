import { useEffect, useState, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../components/Map";
import Marker from "../components/Marker";
import ShopCard from "../components/ShopCard";
import shopData from "../data/shopList.json";
import prefList from "../data/pref.json";
import {
  Accordion,
  Center,
  Stack,
  Text,
  Grid,
  Progress,
  Space,
} from "@mantine/core";
import { ShopInfo, StoreType } from "../interfaces/interface";

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

  const totalCount = shopList.filter((shop) =>
    officialCountCondition(shop)
  ).length;
  const visitCount = shopList.filter(
    (shop) => officialCountCondition(shop) && shop.visited
  ).length;

  const exceptPharmacyTotalCount = shopList.filter((shop) =>
    exceptPharmacyCountCondition(shop)
  ).length;
  const exceptPharmacyVisitCount = shopList.filter(
    (shop) => exceptPharmacyCountCondition(shop) && shop.visited
  ).length;

  function officialCountCondition(shop: ShopInfo) {
    return !shop.closed && shop.storeType != StoreType.HeadOffice;
  }

  function exceptPharmacyCountCondition(shop: ShopInfo) {
    return (
      !shop.closed &&
      shop.storeType != StoreType.HeadOffice &&
      shop.storeType != StoreType.Pharmacy
    );
  }

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
                <Marker shopInfo={shop} key={shop.code} />
              ))}
            </Map>
          </Wrapper>
          <Space h={20} />

          <Grid align="center">
            <Grid.Col span={2}>
              <Text align="right">店舗数：</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text>
                {visitCount} / {totalCount}
              </Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Progress.Root>
                <Progress.Section
                  color="zaggreen"
                  value={(visitCount / totalCount) * 100}
                />
              </Progress.Root>
            </Grid.Col>
          </Grid>
          <Grid align="center">
            <Grid.Col span={2}>
              <Text align="right">店舗数(薬局除外)：</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text>
                {exceptPharmacyVisitCount} / {exceptPharmacyTotalCount}
              </Text>
            </Grid.Col>
            <Grid.Col span={8}>
              <Progress.Root>
                <Progress.Section
                  color="zaggreen"
                  value={
                    (exceptPharmacyVisitCount / exceptPharmacyTotalCount) * 100
                  }
                />
              </Progress.Root>
            </Grid.Col>
          </Grid>
          <Accordion w={1000} variant="contained" defaultValue={"zag"}>
            <Accordion.Item value="zag">
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
