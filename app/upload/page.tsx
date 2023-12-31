import Link from "next/link";
import Layout from "@/components/Layout";
import UploadForm from "./UploadForm";

export default function Upload() {
  return (
    <Layout>
      <Link href="/" className="block w-max text-blue-700 font-medium">
        &lt;- <span className="underline decoration-blue-700/30">Back</span>
      </Link>

      <div className="mt-6">
        <UploadForm />
      </div>
    </Layout>
  );
}
