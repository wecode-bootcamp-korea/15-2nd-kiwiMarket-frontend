/* ------------------- 
매너온도 범위 : -7 ~ 80 
이외 범위 값을 가질 수 있으나 상태 바에 변화 없음
--------------------*/
export const tempToProgress = (temp) => {
  return Math.floor((temp * 50) / 43.5 + 8) * 0.01;
};
