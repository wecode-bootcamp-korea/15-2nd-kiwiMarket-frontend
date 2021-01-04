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

export const postTimeGenerator = (time) => {
  const today = new Date();

  const yearCheck =
    today.getFullYear() - time.split("-")[0] > 1
      ? today.getFullYear() - time.split("-")[0] + "년 전"
      : false;

  const monthCheck =
    today.getMonth() + 1 - time.split("-")[1] > 1
      ? today.getMonth() + 1 - time.split("-")[1] + "달 전"
      : false;

  const dayCheck =
    today.getDate() - time.split("T")[0].split("-")[2] > 0
      ? today.getDate() - time.split("T")[0].split("-")[2] + "일 전"
      : false;

  const todayTime = today.toISOString().split("T")[1].split(".")[0];

  const postTime = time.split("T")[1].split(".")[0];

  const hourCheck =
    todayTime.split(":")[0] - postTime.split(":")[0] > 0
      ? todayTime.split(":")[0] - postTime.split(":")[0] + "시간 전"
      : false;

  const minuteCheck =
    todayTime.split(":")[1] - postTime.split(":")[1] < 60
      ? todayTime.split(":")[1] - postTime.split(":")[1] + "분 전"
      : false;

  const secondCheck =
    todayTime.split(":")[2] - postTime.split(":")[2] > 10
      ? todayTime.split(":")[2] - postTime.split(":")[2] + "초 전"
      : "방금 전";

  return (
    yearCheck ||
    monthCheck ||
    dayCheck ||
    hourCheck ||
    minuteCheck ||
    secondCheck
  );
};
