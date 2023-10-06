import { Card, Col, Row, Tag, Typography } from "antd";

// this component is card for an offer

const TrendingOfferCard = ({
  imgUrl,
  cardClassName,
  textContent,
}: {
  imgUrl: string;
  cardClassName?: string;
  textContent: string;
}) => {
  return (
    <Card className={`cursor-pointer ${cardClassName} w-full md:h-[178px]`}>
      <Row className="items-center gap-3">
        <Col xs={24} md={5} className="">
          <img width={80} height={80} src={imgUrl} alt={textContent} />
        </Col>
        <Col xs={24} md={16} className="flex flex-col">
          <div>
            <Tag className="rounded text-white font-bold">Bus</Tag>
          </div>
          <Typography className="text-white font-bold text-lg">
            {textContent}
          </Typography>
          <Typography className="text-white font-bold">
            Valid till 31 Oct
          </Typography>
        </Col>
      </Row>
    </Card>
  );
};

export default TrendingOfferCard;
