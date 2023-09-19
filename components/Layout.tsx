import Link from "next/link";

export default function Layout({
  slot,
  children,
}: {
  slot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 inset-x-0 z-50 bg-white border-b border-gray-200 p-4">
        <div className="max-w-screen-sm mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="block text-xl font-bold text-blue-600 tracking-tighter"
          >
            faceboard
          </Link>

          {slot}
        </div>
      </header>
      <main className="p-4 pb-24">
        <div className="max-w-screen-sm mx-auto">{children}</div>
      </main>
    </>
  );
}
