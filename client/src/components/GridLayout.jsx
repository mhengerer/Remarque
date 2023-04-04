import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Planner, Card, Todo } from "./grid Items/index.js";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { QUERY_SPREAD } from "../utils/queries.js";

const ResponsiveGridLayout = WidthProvider(Responsive);

const convertLayout = async (cardType, plannerItems) => {
  let Card;
  switch (cardType) {
    case "planner":
      Card = <Planner plannerItems={plannerItems} />;
      break;
    case "todo":
      Card = <Todo />;
      break;
    default:
      Card = <Card />;
      break;
  }
  return Card;
};

const Layout = ({ spread }) => {
  const [gridItems, setGridItems] = useState({});
  const [plannerItems, setPlannerItems] = useState({});
  console.log(spread.plannerItems);
  const [items, setItems] = React.useState([
    {
      i: "0",
      x: 0,
      y: 0,
      w: 2,
      h: 6,
      minW: 1,
      maxW: 5,
      minH: 6,
      maxH: 6,
      card: <Planner plannerItems={spread.plannerItems} />,
    },
    {
      i: "1",
      x: 3,
      y: 0,
      w: 1,
      h: 3,
      minH: 3,
      maxH: 3,
      card: <Card cardItems={spread.gridItems[0]} />,
    },
    {
      i: "2",
      x: 4,
      y: 0,
      w: 1,
      h: 3,
      minH: 3,
      maxH: 3,
      card: <Card cardItems={spread.gridItems[1]} />,
    },
    { i: "3", x: 2, y: 0, w: 3, h: 3, card: <Todo /> },
    {
      i: "4",
      x: 2,
      y: 0,
      w: 1,
      h: 3,
      minH: 3,
      maxH: 3,
      card: <Card cardItems={spread.gridItems[2]} />,
    },
  ]);

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: items }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
      rowHeight={189}
      width={1000}
      margin={[0, 0]}
      resizeHandles={["se"]}
      draggableHandle={".dragHandle"}
      // onLayoutChange={saveLayout()}
    >
      {items.map((item) => {
        return (
          <div
            className="border-4 border-base-300"
            key={item.i}
            data-grid={{ x: item.x, y: item.y }}
          >
            {item.card}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

const GridLayout = ({ spread }) => {
  return <Layout spread={spread} />;
};
export default GridLayout;
