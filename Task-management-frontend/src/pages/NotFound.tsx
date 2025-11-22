import type { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl font-extrabold  mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! The page you’re looking for does not exist.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
