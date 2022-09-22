import "./playground.less";
// 每一层都是10*9，或者9*10 或者9*9
const layerKinds = {
  ten_nine: {
    row: 10,
    column: 9,
  },
  nine_ten: {
    row: 9,
    column: 10,
  },
  nine_nine: {
    row: 9,
    column: 9,
  },
};

const ramdomKind = () => {
  const rool = Math.random();
  if (0 <= rool && rool < 0.333) {
    return layerKinds.ten_nine;
  } else if (0.333 <= rool && rool < 0.666) {
    return layerKinds.nine_ten;
  } else {
    return layerKinds.nine_nine;
  }
};

const randomPositionForOneLayer = () => {
  const layerKind = ramdomKind();
  const items = [];
  for (let i = 0; i < layerKind.column; i++) {
    for (let j = 0; j < layerKind.row; j++) {}
  }
};

const usePlayGround = () => {
  return <div className="playground"></div>;
};
export default usePlayGround;
