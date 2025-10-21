import express from "express";
import multer from "multer";
import {
  uploadDocument,
  verifyDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
  updateDocument,
  shareDocument,
  addCollaborators,
  checkHashExists,
} from "../controllers/documentController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadDocument);
router.post("/verify", verifyDocument);
router.get("/documents", getAllDocuments);
router.get("/documents/:id", getDocumentById);
router.delete("/documents/:id", deleteDocument);
router.put("/documents/:id", updateDocument);
router.post("/share/:id", shareDocument);
router.post("/collaborators/:id", addCollaborators);
router.get("/hash/:hash", checkHashExists);

export default router;
