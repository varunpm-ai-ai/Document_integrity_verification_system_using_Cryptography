import { createHash } from "crypto";
import Document from "../models/Document.js";
import fs from "fs";

// Post /upload
export const uploadDocument = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No files uploaded" });

    const uploadedDocs = [];

    for (const file of req.files) {
      const fileBuffer = fs.readFileSync(file.path);
      const hash = createHash("sha256").update(fileBuffer).digest("hex");

      const doc = await Document.create({
        filename: file.filename,
        originalname: file.originalname,
        hash,
        size: file.size,
        mimetype: file.mimetype,
        path: file.path,
      });

      uploadedDocs.push(doc);
    }

    res.json({ message: "Files uploaded successfully", documents: uploadedDocs });
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
  try {
    const { id } = req.params;
    const deletedDoc = await Document.findByIdAndDelete(id);
    if (!deletedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /documents/:id
export const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.body;

    const updatedDoc = await Document.findByIdAndUpdate(
      id,
      { filename },
      { new: true }
    );

    if (!updatedDoc) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post /document/:id
export const shareDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Generate a unique share token 
    const shareToken = crypto
      .createHash("sha256")
      .update(id + Date.now().toString())
      .digest("hex");

    document.shareToken = shareToken;
    await document.save();

    const shareableLink = `http://localhost:5000/api/share/${shareToken}`;
    res.json({ shareableLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

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