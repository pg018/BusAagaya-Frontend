// this component is used as wrapper for pages in the application
const CustomLayout = ({
  children,
  minHeight = "100vh",
}: {
  children: React.ReactNode;
  minHeight?: string;
}) => {
  return (
    <div
      className="relative"
      style={{
        backgroundColor: "#f39c12",
        minHeight: minHeight,
        height: "auto",
      }}
    >
      {children}
    </div>
  );
};

export default CustomLayout;
