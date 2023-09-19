import Link from "next/link";
import Layout from "@/components/Layout";
import QuestionForm from "./QuestionForm";

export default function Ask() {
  return (
    <Layout>
      <Link href="/" className="block w-max text-blue-700 font-medium">
        &lt;- <span className="underline decoration-blue-700/30">Back</span>
      </Link>

      <div className="mt-4">
        <QuestionForm />
      </div>
    </Layout>
  );
}
