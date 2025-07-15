// require("express")
import express from "express";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

// 환경변수 로드
dotenv.config();

// JSON형태의 데이터를 객체로 변환
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

// mongoDB연결
// MongoDB객체 생성(mongoDB와의 연결을 관리, 상호작용)
const client = new MongoClient(MONGODB_URI);
const db = client.db(DB_NAME); // 데이터베이스 선택
const collection = db.collection("users"); // 컬렉션 선택

// 데이터 읽기 - GET
app.get("/users", async (req, res) => {
  try {
    // Cursor 객체: 데이터를 한개씩 순차적으로 가져와 document를 반환. 한번에 다 가져오지않고 순차적으로 반환.
    const users = await collection.find().toArray(); // 배열
    console.log("🚀 ~ users:", users.length);
    console.log("🚀 ~ users:", users);
    // 응답
    res.status(200).json(users);
  } catch (error) {
    console.log(`fetch error: ${error}`);
    // 응답
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// 데이터 추가 - POST
app.post("/users", async (req, res) => {
  try {
    // 구조분해할당
    const { name: userName, age, email } = req.body;

    console.log("🚀 ~ userName:", userName);

    const result = await collection.insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    console.log("🚀 ~ result:", result);
    // 응답
    res.status(201).json(result);
  } catch (error) {
    console.log(`Error createing users: ${error}`);
    res.status(500).json({
      message: "Error creating users",
      error: error.message,
    });
  }
});

// 데이터 수정 - PUT
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params; // string
    const data = req.body;

    const result = await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { ...data, updatedAt: new Date() } }
    );

    if (result.matchedCount) {
      // 수정된 문서가 있는경우 응답
      res.status(200).json(result);
      return;
    }
    // 수정된 문서가 없는경우 응답
    res.status(404).json({
      message: "User not found or no changes made",
    });
  } catch (error) {
    console.log(`Error updating user: ${error}`);
    // 응답
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

// 데이터 삭제 - DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // id값을 기준으로 사용자 삭제
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount) {
      // 삭제된 document가 있는 경우
      res.status(200).json({
        message: "User deleted",
        id,
      });
      return;
    }

    // 삭제된 document가 없는 경우
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(`Error deleting user: ${error}`);
    // 응답
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});

// 미션: GET메소드 "/users/:id" API만들기
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await collection.findOne(
      { _id: ObjectId(id) },
      {
        projection: { name: 1 }, // 특정 필드만 가져오는 express 구문
      }
    ); // 객체
  } catch (error) {
    console.log(`Error fetching user: ${error}`);
    // 응답
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
});

const connectDB = async () => {
  try {
    // DB와의 연결 시도
    await client.connect();
    console.log("🚀 MongoDB connected");
  } catch (error) {
    console.log(`⚠️ MongoDB Error: ${error}`);
  }
};

app.listen(8080, () => {
  console.log("server running at", PORT);
  console.log(process.env.MONGODB_URI);
  connectDB();
});
