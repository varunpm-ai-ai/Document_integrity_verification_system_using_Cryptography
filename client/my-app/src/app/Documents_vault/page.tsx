import React from "react";
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
          <Card className="hide-scrollbar w-9/10 overflow-auto max-h-screen " >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Your Documets</span>
                <div className=" flex gap-2">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Share />
                    Share
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-1 bg-blue-400 hover:bg-blue-300 "
                  >
                    <Plus />
                    Add Colaborator
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <Separator className="border-1 border-purple-100 " />
            <CardContent>
              <div className="flex justify-between items-center gap-2" >
                <p>Card Content</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" >Update</Button>
                  <Button variant="destructive"  >Delete</Button>
                </div>
              </div>
            </CardContent>
            <Separator className="border-1 border-zinc-400 " />
            <CardContent>
              <div className="flex justify-between items-center " >
                <p>Card Content</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" >Update</Button>
                  <Button variant="destructive"  >Delete</Button>
                </div>
              </div>
            </CardContent>
            <Separator className="border-1 border-zinc-400 " />

          </Card>
        </div>
      </section>
    </main>
  );
};

export default page;
