import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <h1 className="heading">Welcome to My Website</h1>
      <p className="paragraph">Navigate to different pages:</p>
      <Link href="/login">Login</Link>
    </div>
  );
}
