import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Planner, Card, Table, Todo } from "./grid Items/index.js";
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
    { i: "0", x: 0, y: 0, w: 2, h: 6, minW: 2, minH: 6, card: <Planner /> },
    { i: "1", x: 4, y: 0, w: 1, h: 1, card: <Card /> },
    { i: "2", x: 4, y: 0, w: 1, h: 1, card: <Card /> },
    { i: "3", x: 2, y: 0, w: 2, h: 2, card: <Table /> },
    { i: "4", x: 2, y: 0, w: 3, h: 3, card: <Todo /> },
    { i: "5", x: 2, y: 6, w: 3, h: 1, card: <Card /> },
  ]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: items }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
      rowHeight={150}
      width={1000}
      margin={[0, 0]}
      resizeHandles={["se"]}
    >
      {items.map((item) => {
        return (
          <div
            key={item.i}
            style={styles.border}
            data-grid={{ x: item.x, y: item.y }}
          >
            {item.card}
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
