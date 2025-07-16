// 자바스크립트 기초

// 배열
const dayOfWeeks = [
  "월요일", // 0
  "화요일", // 1
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일", // 6
];
// length: 7
console.log(dayOfWeeks[dayOfWeeks.length - 1]); // 마지막 데이터

const person = {
  name: "후츠릿",
  mbti: "entj",
};

const key = "mbti";

console.log("mbti", person.mbti);
console.log("mbti", person[key]);

const animals = ["cat", "dog", "pig"];

// for (let i = 0; i < animals.length; i++) {
//   console.log(`${i}번째 실행`);
//   console.log(animals[i]);
// }

animals.forEach((item, index, array) => {
  console.log("🚀 ~ item:", item);
  console.log("================================");
});

// map: 조작할 내용 작성  (배열 리턴)
const newAnimals = animals.map((item) => `${item}🔥`);
console.log("🚀 ~ newAnimals:", newAnimals);

// filter: 조건식 작성 (배열 리턴)
const filteredAnimals = animals.filter((item) => item.startsWith("c"));
console.log("🚀 ~ filteredAnimals:", filteredAnimals);

// find: 조건식 작성 (요소 or undefined 리턴)
const findAnimal = animals.find((item) => item.length === 3);
console.log("🚀 ~ findAnimal:", findAnimal);

// some/every: 조건식 작성 (boolean 리턴)
const someAnimal = animals.some((item) => item.endsWith("g"));
console.log("🚀 ~ someAnimal:", someAnimal); // true

const everyAnimal = animals.every((item) => item.endsWith("g"));
console.log("🚀 ~ everyAnimal:", everyAnimal); // false

console.log("원본배열:", animals);

// logical operators

const user = {
  isLoggedIn: true, // 로그인여부
  role: "user", // "user", "guest" 유저의 역할
};

// admin페이지에 접근할수 있는지 여부
const isAccessAdminPage = user.isLoggedIn && user.role === "admin";
// if (isAccessAdminPage) {
//   console.log("✅ 관리자페이지에 접근하실수 있습니다");
// } else {
//   console.log("❌ 관리자페이지에 접근하실수 없습니다");
// }

console.log(
  isAccessAdminPage
    ? "✅ 관리자페이지에 접근하실수 있습니다"
    : "❌ 관리자페이지에 접근하실수 없습니다"
);

// 로그인 된 사용자 "이거나" 롤이 admin인 사용자이면 true
const isAccessUserPage = user.isLoggedIn || user.role === "admin"; // true
console.log("🚀 ~ isAccessUserPage:", isAccessUserPage);

const double = (num = 1) => {
  console.log("🚀 ~ num:", num);
  return num * 2;
};

console.log("double1", double());
console.log("double2", double(2));

// 삼항 연산자
// score값이 60점 이상이면 "합격", 60점 미만이면 "탈락"
const score = 50;
const result = score >= 60 ? "합격" : "탈락";
console.log("🚀 ~ result:", result); // 합격

// spread syntax
// 배열이나 객체를 개별요소로 분해하거나 결합할때 사용되는 문법
const copyArr = [...animals, "value"];
console.log("animals", animals);
console.log("copyArr", copyArr);

const todoItem = {
  id: 1,
  content: "React공부하기",
};

const newItem = {
  ...todoItem,
  isComplete: false, // 기존에 존재하지 않은 키값: 추가
  content: "MongoDB 공부하기", // // 기존에 존재하는 키값: 수정
};
console.log("🚀 ~ todoItem:", todoItem);
console.log("🚀 ~ newItem:", newItem);

// javscipt에서 false로 간주되는 것들 4가지
// 숫자 0
// string ""
// null
// undefined

if (!"") {
  // 사용자 입력값이 없는경우
}
