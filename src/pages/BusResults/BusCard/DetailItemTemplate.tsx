import { Typography } from "antd";

const DetailItemTemplate = ({
  label,
  data,
}: {
  label: string;
  data: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center">
      <Typography className="font-bold">{label}: &nbsp;</Typography>
      <Typography>{data}</Typography>
    </div>
  );
};

export default DetailItemTemplate;
