import { createHash } from "crypto";
import Document from "../models/Document.js";
import fs from "fs";

// Post /upload
export const uploadDocument = async (req, res) => {
    try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const hash = createHash('sha256').update(fileBuffer).digest('hex');

        const doc = await Document.create({
            filename: req.file.filename,
            originalname: req.file.originalname,
            hash,
            size: req.file.size,
            mimetype: req.file.mimetype,
            path: req.file.path,
        });

        res.json({ message: "File Uploaded successfully", document: doc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Post /verify
export const verifyDocument = async (req, res) => {
    try {
        const { hash } = req.body;
        const doc = await Document.findOne({ hash });

        if (doc) return res.json({ valid: true, document: doc });
        res.json({ valid: false, message: "Document not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get /documents
export const getAllDocuments = async (req, res) => {
    try {
        const docs = await Document.find().sort({ createdAt: -1 });
        res.json(docs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Get /document/:id
export const getDocumentById = async (req, res) => {
    try {
        await Document.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: "Not found" });
        res.json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE /documents/:id
export const deleteDocument = async (req, res) => {
  const doc = await Document.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted successfully" });
};

// PUT /documents/:id
export const updateDocument = async (req, res) => {
    try {
        const doc = await Document.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(doc);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// Post /document/:id
export const shareDocument = async (req, res) => {
    try {
        const token = crypto.randomBytes(8).toString('hex');
        const doc = await Document.findByIdAndUpdate(
            req.params.id, 
            { shareToken: token }, 
            { new: true }
        );
        res.json({ shareLink: `/share/${token}`, document: doc });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

// POST /collaborators/:id
export const addCollaborators = async (req, res) => {
  const { collaborators } = req.body;
  const doc = await Document.findByIdAndUpdate(
    req.params.id,
    { $push: { collaborators: { $each: collaborators } } },
    { new: true }
  );
  res.json(doc);
};

// GET /hash/:hash
export const checkHashExists = async (req, res) => {
  const doc = await Document.findOne({ hash: req.params.hash });
  res.json({ exists: !!doc, document: doc });
};