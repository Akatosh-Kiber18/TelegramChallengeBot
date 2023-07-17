import {Router} from "express";
import User from "../models/User.js";

export const userRoutes = new Router();

userRoutes.post("/api/user", addUserHandler);
userRoutes.get("/api/users", getUsersHandler);

async function addUserHandler (req, res) {
    try {
        const { name, tgId } = req.body;
    
        const existingUser = await User.findOne({
            where: {
            Name: name,
            TgID: tgId
            },
        });
    
        if (!existingUser) {
            const newUser = User.build({
                Name: name,
                TgID: tgId
            });
            newUser.save()
            .then(savedResult => res.json(savedResult))
            .catch(error => res.json(error));
        } else {
            res.status(409).json({ error: "User already exists" });
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
        }
}

function getUsersHandler (req, res) {
    User.findAll()
    .then(users => res.json(users))
    .catch(error => res.json(error));
}