import { Responsive as ResponsiveGridLayout } from "react-grid-layout";

const styles = {
  border: {
    borderColor: "#000000",
    borderWidth: 5,
  },
};

const MyFirstGrid = () => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 6, h: 2, static: "true"},
    { i: "b", x: 0, y: 0, w: 6, h: 2, static: "true"},
    { i: "c", x: 0, y: 0, w: 6, h: 2, static: "true"},
    { i: "d", x: 0, y: 0, w: 6, h: 2, static: "true"},
    { i: "e", x: 0, y: 0, w: 6, h: 2, static: "true"},
    { i: "f", x: 0, y: 0, w: 3, h: 2, static: "true"},
    { i: "g", x: 0, y: 0, w: 3, h: 2, static: "true"}
];
  return (
    <ResponsiveGridLayout
      className="layout"
      layout={layout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      margin={[0, 0]}
      width={1200}
    >
      <div key="a" style={styles.border}>
        Monday
      </div>
      <div key="b" style={styles.border}>
        Tuesday
      </div>
      <div key="c" style={styles.border}>
        Wednesday
      </div>
      <div key="d" style={styles.border}>
        Thursday
      </div>
      <div key="e" style={styles.border}>
        Friday
      </div>
      <div key="f" style={styles.border}>
        Saturday
      </div>
      <div key="g" style={styles.border}>
        Sunday
      </div>
    </ResponsiveGridLayout>
  );
};
export default MyFirstGrid;
