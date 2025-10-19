import Image from "next/image";
import cryptoVerifyImage from "../../public/varify.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";

export default function Home() {
  return (
    <>
      {/* Bread Crumb */}
      <Breadcrumb className="mt-[1px]" >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <main className="bg-white min-h-screen mx-auto ">
        {/* Navbar */}
        <nav className="w-full px-6 py-8">
          <div className="text-3xl font-bold text-gray-600">CryptoDocs</div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-center ">
          <div className="max-w-xl">
            <h1 className="text-sm font-bold text-gray-700 mb-2 border border-purple-200 p-2 rounded-lg ">
              Effortless Document Verification
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Powerful document verification
            </h2>
            <p className="text-gray-600 text-lg">
              CryptoDocs is a document integrity verification system using
              cryptography. Ensure your documents are authentic, tamper-proof,
              and secure — all with the power of cryptographic trust.
            </p>
          </div>
          <div className="mt-10 md:mt-0 md:ml-10">
            <Image
              src={cryptoVerifyImage}
              alt="Verifying document using cryptography"
              width={500}
              height={400}
              priority
            />
          </div>
        </section>
      </main>
    </>
  );
}
