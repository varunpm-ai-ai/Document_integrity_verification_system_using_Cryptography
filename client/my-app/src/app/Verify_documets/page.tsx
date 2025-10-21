"use client";

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Check, Cross, File, X } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import cryptoVerifyImage from "../../../public/crypto-verify.png";
import crypto from "crypto";
import { Button } from "@/components/ui/button";
import CryptoJS from "crypto-js";

const page = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [Verified, setVerified] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFiles([droppedFile]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const computeFileHash = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer as any);
    const hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
    return hash;
  };

  const handleVerify = async () => {
    if (!files.length) return alert("Select a file first");
    const hash = await computeFileHash(files[0]);

    try {
      const res = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash }),
      });

      const data = await res.json();
      setVerified(data.valid);
    } catch (err) {
      console.error(err);
      alert("Error verifying document");
    }
  };

  return (
    <main className="w-full">
      {/* Breadcrumbs */}
      <div>
        <Breadcrumb className="mt-1">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/Verify_documets">
                Verify_documets
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Page content */}
      <section className="mt-6 ">
        <h1 className="text-2xl font-semibold mb-1">Verify_documets</h1>
        <p className="text-gray-600">Upload your documents here to verify.</p>
        <div className="mt-2">
          <Separator className="border-1 border-purple-100 " />
        </div>

        <div className="flex flex-row gap-2 mx-auto items-center justify-center">
          <div
            className={`mt-5 border-2 border-blue-600 py-45 rounded-2xl w-4/10
         flex items-center justify-center transition-all duration-200
          ${
            isDragging
              ? "border-purple-500 bg-purple-50 ring-2 ring-purple-300"
              : "border-blue-600 hover:bg-purple-50 hover:ring-1 hover:ring-green-500"
          }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col mx-auto ">
              <File className=" w-full flex items-center justify-center" />
              <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleFileChange}
                className="hidden text-center cursor-pointer pl-27 "
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex flex-col items-center"
              >
                <span className="text-gray-700 text-center">
                  {files && files.length > 0 ? (
                    `${files.length} file(s) selected`
                  ) : (
                    <>
                      <span className="text-gray-700">
                        <span className="text-purple-500 font-extrabold ">
                          Click here
                        </span>{" "}
                        to upload your documents <br /> or drag and drop
                      </span>
                    </>
                  )}
                </span>
              </label>
            </div>
          </div>

          <div className="mt-5 rounded-2xl w-4/10 ">
            <Card>
              <CardHeader>
                <CardTitle>Document</CardTitle>
                <CardDescription className="flex justify-between items-center">
                  <div>
                    {Verified ? (
                      <div className="flex">
                        <span>
                          <Check />
                        </span>
                        Verified
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <span>
                          <X />
                        </span>
                        Not Verified
                      </div>
                    )}
                  </div>

                  <div>
                    <Button className=" w-full" onClick={handleVerify}>
                      Verify Document
                    </Button>
                  </div>
                </CardDescription>
              </CardHeader>
              <div className="mt-2">
                <Separator className="border-1 border-purple-100 " />
              </div>
              <CardContent className="py-4 ">
                <div className="w-full h-62 relative overflow-hidden rounded-lg">
                  <Image
                    src={files[0] ? URL.createObjectURL(files[0]) : cryptoVerifyImage.src}
                    alt="Verifying document using cryptography"
                    fill
                    className="object-cover border border-dashed border-purple-600"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
