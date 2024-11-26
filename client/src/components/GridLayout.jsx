import React, { useState, useContext, useEffect } from "react";
import UpdateContext from "../components/UpdateContext";
import { Planner, Card, Todo } from "./grid_items/index.js";
import "../../node_modules/react-grid-layout/css/styles.css";
import "../../node_modules/react-resizable/css/styles.css";
import { DndContext } from "@dnd-kit/core";

const DndKitLayout = ({
  userId,
  spread,
  allSpreads,
  currentSpread,
  userCollections,
  refetchData,
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-2 md:w-1/2 lg:w-1/3">
        <Planner
          weeklyCollections={spread.weeklyCollections}
          allSpreads={allSpreads}
          currentSpread={currentSpread}
          userCollections={userCollections}
          userId={userId}
          refetchData={refetchData}
        />
      </div>
      <div className="w-full flex flex-wrap md:w-1/2 lg:w-3/4 h-[calc(100vh-16rem)]">
        <DndContext>
          {userCollections.map((collection) => {
            return (
              <Card
                cardItems={collection}
                key={collection._id}
                userCollections={userCollections}
                spreadCollections={spread.weeklyCollections}
                refetchData={refetchData}
              ></Card>
            );
          })}
        </DndContext>
      </div>
    </div>
  );
};

export default DndKitLayout;
