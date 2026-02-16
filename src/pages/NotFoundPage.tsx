import { Link } from "react-router";
import Navbar from "../components/layout/Navbar";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 py-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-20 mb-4">404</h1>
        <p className="text-gray-500 mb-6">Page not found</p>
        <Link
          to="/"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Back to My Requests
        </Link>
      </main>
    </div>
  );
}
