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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const page = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(true);

  return (
    <main className=" w-full ">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6 mt-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/Upload_Documents">
              Upload Documents
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page content */}
      <section className="">
        <h1 className="text-2xl font-semibold mb-1">Upload Documents</h1>
        <p className="text-gray-600">Upload your documents here.</p>
        <div className="mt-2">
          <Separator className="border-1 border-purple-100 " />
        </div>

        <div
          className="mt-5 border-2 border-blue-600 py-20 rounded-2xl w-9/10 mx-auto
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

        <div className="mt-6 w-9/10 mx-auto ">
          <Card>
            <CardHeader>
              <CardTitle className="pl-4">Attached Files</CardTitle>
              <CardDescription className="pl-4">
                Your can explore your Uploaded files here
              </CardDescription>
            </CardHeader>
            <Separator className="border-1" />
            <CardContent className="flex gap-2 items-center ">
              <File width={30} height={40} />
              {uploading ? (
                <div className="w-full ">
                  <div className="flex justify-between items-center ">
                    <span> Card Content</span>
                    <div>
                      <Button variant="destructive">Stop</Button>
                    </div>
                  </div>
                  <Progress value={33} className="mt-1" />
                </div>
              ) : (
                <div className="w-full ">
                  <div className="flex justify-between items-center ">
                    <span> Card Content</span>
                    <div className="space-x-4" >
                      <Button variant="destructive">Delete</Button>
                      <Button variant="outline">Done</Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default page;
