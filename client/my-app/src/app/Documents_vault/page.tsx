"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";

const page = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch("http://localhost:5000/documents");
        const data = await res.json();

        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    try {
      const res = await fetch(`http://localhost:5000/documents/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete document");

      setDocuments((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting document");
    }
  };

  const handleUpdate = async (id: string, currentName: string) => {
    const newName = prompt("Enter new filename:", currentName);
    if (!newName || newName === currentName) return;

    try {
      const res = await fetch(`http://localhost:5000/documents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: newName }),
      });

      if (!res.ok) throw new Error("Failed to update document");

      const updatedDoc = await res.json();

      setDocuments((prev) =>
        prev.map((doc) => (doc._id === id ? updatedDoc : doc))
      );
    } catch (err) {
      console.error(err);
      alert("Error updating document");
    }
  };

  const handleShare = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/share/${id}`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to generate share link");

      const data = await res.json();

      alert(`Shareable link: ${data.shareableLink}`);

      await navigator.clipboard.writeText(data.shareableLink);
      console.log("Link copied to clipboard!");
    } catch (err) {
      console.error(err);
      alert("Error generating share link");
    }
  };

  return (
    <main className="w-full hide-scrollbar overflow-auto max-h-screen">
      <div>
        <Breadcrumb className="mt-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/Documents_vault">
                Documents_vault
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section className="mt-6 hide-scrollbar overflow-auto max-h-screen ">
        <div>
          <h1 className="text-2xl font-semibold mb-1">My Files and Assets</h1>
          <p className="text-gray-600">Browse your importent documents here</p>
          <div className="mt-2">
            <Separator className="border-1 border-purple-100 " />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center mx-auto ">
          <Card className="hide-scrollbar w-9/10 overflow-auto max-h-screen ">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Your Documets</span>
                <div className=" flex gap-2">
                  {/* <Button
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleShare}
                  >
                    <Share />
                    Share
                  </Button> */}
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 bg-blue-400 hover:bg-blue-300 "
                    onClick={() => {
                      const email = prompt("Enter the collaborator's email:");
                      if (email) {
                        alert(`Collaborator added: ${email}`);
                        console.log("Collaborator Email:", email);
                      } else {
                        alert("No email entered.");
                      }
                    }}
                  >
                    <Plus />
                    Add Collaborator
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <Separator className="border-1 border-purple-100 " />

            {/* Loading state */}
            {loading ? (
              <CardContent className="text-center py-10 text-gray-500">
                Loading documents...
              </CardContent>
            ) : documents.length === 0 ? (
              <CardContent className="text-center py-10 text-gray-500">
                No documents uploaded yet.
              </CardContent>
            ) : (
              documents.map((doc) => (
                <React.Fragment key={doc._id}>
                  <CardContent>
                    <div className="flex justify-between items-center gap-2">
                      <p className="font-medium text-gray-700">
                        {doc.filename}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleUpdate(doc._id, doc.filename)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(doc._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <Separator className="border-1 border-zinc-400" />
                </React.Fragment>
              ))
            )}
          </Card>
        </div>
      </section>
    </main>
  );
};

export default page;
