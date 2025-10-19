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
import { File } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  const [files, setFiles] = useState<FileList | null>(null);

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
      <section className="mt-6">
        <h1 className="text-2xl font-semibold mb-1">Upload Verify_documets</h1>
        <p className="text-gray-600">Upload your documents here to verify.</p>
        <div className="mt-2">
          <Separator className="border-1 border-purple-100 " />
        </div>

        <div
          className="mt-5 border-2 border-blue-600 py-45 rounded-2xl w-1/2 
         flex items-center justify-center hover:bg-purple-50 hover:ring-1 hover:ring-green-500  "
        >
          <div className="flex flex-col mx-auto ">
            <File className=" w-full flex items-center justify-center" />
            <input
              type="file"
              id="fileInput"
              multiple
              onChange={(e) => setFiles(e.target.files)}
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
      </section>
    </main>
  );
};

export default page;
