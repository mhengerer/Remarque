import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const styles = {
  border: {
    borderColor: "#000000",
    borderWidth: 5,
  },
};

const Layout = (props) => {
  const [items, setItems] = React.useState([
    { i: "a", x: 0, y: 0, w: 1, h: 1 },
    { i: "b", x: 2, y: 0, w: 1, h: 1 },
    { i: "c", x: 0, y: 0, w: 1, h: 1 },
    { i: "d", x: 2, y: 0, w: 1, h: 1 },
    { i: "e", x: 0, y: 0, w: 1, h: 1 },
    { i: "f", x: 2, y: 0, w: 1, h: 1 },
  ]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: items }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
      rowHeight={300}
      width={1000}
      margin={[0,0]}
      resizeHandles={["se"]}
    >
      {items.map((item) => {
        return (
          <div
            key={item.i}
            style={styles.border}
            data-grid={{ x: item.x, y: item.y }}
          >
            {item.i}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

const GridLayout = () => {
  return <Layout />;
};
export default GridLayout;
