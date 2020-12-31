/* ------------------- 
매너온도 범위 : -7 ~ 80 
이외 범위 값을 가질 수 있으나 상태 바에 변화 없음
--------------------*/
export const tempToProgress = (temp) => {
  return Math.floor((temp * 50) / 43.5 + 8) * 0.01;
};

export const smallCardViewArrayGenerator = (arr) => {
  if (arr.length === 0) return [];
  if (arr.length === 1) return [[arr[0], []]];
  const newArr = [];

  if (arr.length % 2) {
    for (let i = 0; i < arr.length - 1; i += 2) {
      newArr.push([arr[i], arr[i + 1]]);
    }
    newArr.push([arr[arr.length - 1], []]);
    return newArr;
  }

  for (let i = 0; i < arr.length; i += 2) {
    newArr.push([arr[i], arr[i + 1]]);
  }
  return newArr;
};
