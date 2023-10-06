import { Card } from "antd";

const OCard = ({
  cardTitle,
  cardClassName,
  children,
}: {
  cardTitle: string;
  cardClassName?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card
      title={cardTitle}
      className={`${cardClassName}`}
      headStyle={{ border: "none", fontWeight: "bold", fontSize: "24px" }}
    >
      {children}
    </Card>
  );
};

export default OCard;
