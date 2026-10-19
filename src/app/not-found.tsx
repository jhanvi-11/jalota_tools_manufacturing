import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <p className="text-[#C8A04B] font-bold tracking-widest text-xs uppercase font-heading">
          404 Error
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white uppercase font-heading">
          Page Not Found
        </h1>
        <p className="text-sm text-[#CFCFCF] leading-relaxed">
          The requested page or industrial tool does not exist or has been moved.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#C8A04B] hover:bg-[#E6C667] text-[#000000] font-bold text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 active:scale-95"
          >
            Return Home
          </Link>
          <Link
            href="/products"
            className="border border-[#C8A04B] text-[#C8A04B] hover:bg-[#C8A04B] hover:text-[#000000] font-bold text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300 active:scale-95"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
