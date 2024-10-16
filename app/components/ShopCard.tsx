import { Card, Space, Image } from "@mantine/core";

const IMAGE_VISIT = "./images/zagface_g.png";
const IMAGE_NOVISIT = "./images/zagface_r.png";
const IMAGE_CLOSED = "./images/zagface_gray.png";

export default function ShopCard(options) {
  const shopInfo: ShopInfo = options.shopInfo;

  const imageUrl = shopInfo.closed
    ? IMAGE_CLOSED
    : shopInfo.visited
    ? IMAGE_VISIT
    : IMAGE_NOVISIT;

  return (
    <>
      <Card withBorder mb="xs">
        {shopInfo.code}　{shopInfo.name}
        <Space h="md" />
        <Image src={imageUrl} h={50} w={50} />
        {shopInfo.prefName}
        {shopInfo.address}
      </Card>
    </>
  );
}
