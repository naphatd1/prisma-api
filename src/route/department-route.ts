import express from "express";
import { create, index, remove, search, show, update } from "../controllers/department-controller";

const router = express.Router();

//localhost:4000/api/v1/department/search?name=จิตเวช
router.get("/search", search);

//localhost:4000/api/v1/department/
router.get("/", index);

//localhost:4000/api/v1/department/5
router.get("/:id", show);

//localhost:4000/api/v1/department/
router.post("/", create);

//localhost:4000/api/v1/department/5
router.put("/:id", update);

//localhost:4000/api/v1/department/5
router.delete("/:id", remove);

export default router;
