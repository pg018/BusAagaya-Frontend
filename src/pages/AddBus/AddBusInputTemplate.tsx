import { Divider } from "antd";
import Title from "antd/es/typography/Title";

const AddBusInputTemplate = ({
  title,
  children,
  showTitle = true,
}: {
  title: string;
  children: React.ReactNode;
  showTitle?: boolean;
}) => {
  return (
    <div className="mb-5">
      {showTitle && (
        <div>
          <Title level={3} style={{ fontWeight: "bold" }}>
            {title}
          </Title>
          <Divider />
        </div>
      )}
      <div className="flex flex-col md:flex-row flex-wrap md:gap-3 sm:gap-4 justify-between">
        {children}
      </div>
    </div>
  );
};

export default AddBusInputTemplate;
