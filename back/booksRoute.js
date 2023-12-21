import express from "express";
import { create, deleteBook, findBook, read, update } from "./bookModel.js";

const router = express.Router();
router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Kirim semua yang diperlukan : title, author, publishYear",
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await create(req.body.title, req.body.author, req.body.publishYear);
        return res.status(201).send(book);
    } catch (error) {
        error.message;
        res.status(500).send({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const books = await read();
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await findBook(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Kirim semua yang diperlukan : title, author, publishYear",
            });
        }
        const { id } = req.params;
        const result = await update(id, req.body.title, req.body.author, req.body.publishYear);
        if (!result) {
            return res.status(404).json({ message: "Book tidak ditemukan" });
        }
        return res.status(200).send({ message: "Book berhasil diupdate" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteBook(id);
        if (!result) {
            return res.status(404).json({ message: "Book tidak ditemukan" });
        }
        return res.status(200).send({ message: "Book berhasil Di Hrouterus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// router.post("/book", async function (req, res) {
//     try {
//         await create(req.body.title, req.body.author, req.body.publishYear);
//         return res.json({ success: "Berhasil menambahkan buku" });
//     } catch (error) {
//         return res.json({ error: error.message }).status(400);
//     }
// });
export default router;
