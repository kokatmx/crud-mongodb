import { ObjectId } from "mongodb";
import { client } from "./config.js";

const db = client.db("uasBasdat");

const buku = db.collection("buku");
export const user = db.collection("user");

export async function create(title, author, publishYear) {
    if (title == null || author == null || publishYear == null) throw new Error("Field tidak lengkap");
    await buku.insertOne({ title, author, publishYear });
}
export async function update(id, title, author, publishYear) {
    console.log(id);
    if (title == null || author == null || publishYear == null) throw new Error("Field tidak lengkap");
    const result = await buku.updateOne({ _id: new ObjectId(id) }, { $set: { title, author, publishYear } });
    return result;
}
export async function read() {
    const bukus = await buku.find({}).toArray();
    return bukus;
}
export async function deleteBook(id) {
    const a = { _id: new ObjectId(id) };
    const result = await buku.deleteOne(a);
    return result;
}
export async function findBook(id) {
    const a = { _id: new ObjectId(id) };
    const bukus = await buku.find(a).toArray();
    return bukus;
}

export const register = async (username, email, password) => {
    const a = await user.insertOne({ username, email, password });
    return a;
};
