import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../../prisma/client";
import { authenticate } from "../utils/util.authenticate";
import { Prisma } from "@prisma/client";

import { isEmailValid, isPasswordValid } from "../utils/util.validator";

const router = Router();

const secretKey = "sshhh"; // [TODO] move to .env

router.post("/register", async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		if(isEmailValid(email) && isPasswordValid(password)) {
			const saltRounds = 10;
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(password, salt);
			await prisma.user.create({
				data: {
					email: email,
					password: hashedPassword,
				},
			});
			return res.json({ success: true, data: "done" });
		}
		return res.json({ success: false, error: "Please enter valid details! Email must be valid and password must be greater than 6 characters!" });
	} catch(err) {
		if(err instanceof Prisma.PrismaClientKnownRequestError) {
			if(err.code === "P2002") {
				return res.json({ success: false, error: "Email already exists!" });
			}
		}
		return res.json({ success: false, error: "Something went wrong!" });
	}
});

router.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const user = await prisma.user.findUnique({ where: { email: email } });
	if(user) {
		const isLoginValid = bcrypt.compareSync(password, user.password);
		if(isLoginValid) {
			const token = jwt.sign({ email: user.email, admin: user.admin }, secretKey, { expiresIn: '1h' });
			res.cookie('lmst', token, { httpOnly: true, secure: true });
			return res.json({ success: true, data: "done" });
		}
	}
	return res.json({ success: false, error: "Incorrect email or password!" });
});

router.get("/me", authenticate, (req, res) => {
	return res.json({ success: true, data: { user: req.user } });
});

router.post("/logout", authenticate, (_req, res) => {
	res.clearCookie("lmst");
	return res.json({ success: true, data: "done" });
});

export default router;
