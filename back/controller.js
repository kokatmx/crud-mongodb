import { client } from "./config.js";

const db = client.db("uasBasdat");
const barang = db.collection("barang");
export const user = db.collection("users");
function toTitleCase(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}
export async function insertDocuments(nama, deskripsi) {
    nama = toTitleCase(nama);
    deskripsi = toTitleCase(deskripsi);
    const documents = { nama, deskripsi };
    const result = await barang.insertOne(documents);
    return `${result.insertedId} documents inserted`;
}
export async function findAll() {
    const document = await barang.find({}).toArray();
    return document;
}
export async function findDocuments(nama) {
    nama = toTitleCase(nama);
    const documents = await barang.find({ nama: { $regex: nama, $options: "i" } }).toArray();

    return documents;
}
export async function updateDocument(currName, newName, newDeskripsi) {
    currName = toTitleCase(currName);
    newName = toTitleCase(newName);
    newDeskripsi = toTitleCase(newDeskripsi);
    const filter = { nama: currName };
    const update = { $set: { nama: newName, deskripsi: newDeskripsi } };

    const result = await barang.updateOne(filter, update);
    return `${result.modifiedCount} document updated`;
}
export async function deleteDocument(nama) {
    const filter = { nama };

    const result = await barang.deleteOne(filter);
    return `${result.deletedCount} document deleted`;
}
