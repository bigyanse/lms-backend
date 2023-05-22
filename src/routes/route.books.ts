import { Router } from "express";

import prisma from "../../prisma/client";

const router = Router();

router.get("/", async (_req, res) => {
	const books = await prisma.book.findMany();
	res.json({ success: true, data: { books: books } });
});

router.post("/book/add", async (req, res) => {
	try {
		await prisma.book.create({
			data: {
				title: req.body.title,
				description: req.body.description,
				image: req.body.image,
				author: req.body.author,
				genre: req.body.genre,
			},
		});
		return res.json({ success: true, data: "success" });
	} catch(err: any) {
		return res.json({ success: false, data: "error" });
	}
});

router.get("/book/:id", async (req, res) => {
	try {
		const book = await prisma.book.findUnique({
			where: {
				id: req.params.id,
			},
		});
		return res.json({ success: true, data: { book: book } });
	} catch(err: any) {
		return res.json({ success: false, data: "error" });
	}
});

router.put("/book/:id/edit", async (req, res) => {
	try {
		await prisma.book.update({
			where: {
				id: req.params.id
			},
			data: {
				title: req.body.title,
				description: req.body.description,
				image: req.body.image,
				author: req.body.author,
				genre: req.body.genre,
			},
		});
		return res.json({ success: true, data: "success" });
	} catch(err: any) {
		return res.json({ success: false, data: "error" });
	}
});


router.delete("/book/:id/delete", async (req, res) => {
	try {
		await prisma.book.delete({
			where: {
				id: req.params.id,
			},
		});
		return res.json({ success: true, data: "done" });
	} catch(err: any) {
		return res.json({ success: false, data: "error" });
	}
});

router.get("/search", (req, res) => {
	//
});

export default router;
