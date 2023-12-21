import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  deleteDocument,
  findAll,
  findDocuments,
  insertDocuments,
  updateDocument,
  user,
} from "./controller.js";
import { getUser, validateAdmin, validateLogin } from "./validation.js";
export const router = express.Router();
router.get(
  "/barang",validateLogin,
  async function (req, res) {
    let data = [];
    data = await findAll();
    return res.json(data);
  }
);
router.post("/barang/find",validateLogin, async function (req, res) {
  let data = [];
  data = await findDocuments(req.body.nama);
  return res.json(data);
});
router.post("/barang",validateAdmin, async function (req, res) {
  const body = req.body;
  return res.json(await insertDocuments(body.nama, body.deskripsi));
});
router.put("/barang",validateAdmin, async function (req, res) {
  const body = req.body;
  return res.json(
    await updateDocument(body.namaLama, body.namaBaru, body.deskripsiBaru)
  );
});
router.delete("/barang",validateAdmin, async function (req, res) {
  const body = req.body;
  return res.json(await deleteDocument(body.nama));
});
router.post("/register", async function (req, res) {
  const users = await user.findOne({ username: req.body.username });
  if (users) return res.json({ error: "Username sudah digunakan" });
  const email = await user.findOne({ name: req.body.email });
  if (email) return res.json({ error: "Email sudah digunakan" });
  if (req.body.password.length < 7)
    return res.json("Password minimal adalah 6 huruf");
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.insertOne({
    name: req.body.name,
    username: req.body.username,
    role: req.body.role,
    email: req.body.email,
    password: hashedPassword,
  });
  return res.json({ message: "User berhasil ditambahkan" });
});
router.post("/login", async function (req, res) {
  const users = await user.findOne({ username: req.body.username });
  if (!users) return res.json({ error: "Username tidak ditemukan" });
  const isValid = await bcrypt.compare(req.body.password, users.password);
  if (!isValid) return res.json({ error: "Password anda salah" });
  delete users.password;
  let secret = "";
  switch (users.role) {
    case "user":
      secret = process.env.USER_SECRET;
      break;
    case "admin":
      secret = process.env.ADMIN_SECRET;
      break;
  }
  const token = jwt.sign(users, secret, { expiresIn: "2h" });
  // res.cookie("token", token);
  return res.cookie("token", token).json({ message: "Login Berhasil" });
});
router.get("/logout", function (req, res) {
  res.clearCookie("token");
  return res.json({ message: "Berhasil Logout" });
});
router.post("/user",getUser)
router.get("/admin/user",validateAdmin,async function (req,res) {
  const users = await user.find({}).toArray()
  users.forEach(element => {
    delete element.password
  });
  return res.json(users)
})
