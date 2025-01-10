import Link from "next/link";
import "../styles/globals.css";

export default function HomePage() {
  return (
    <div className="home-container ">
      <h1 className="home-heading">Welcome to Website</h1>
      <p className="home-subheading">Navigate to different pages:</p>
      <Link href="/login"> <div className="home-link">Login</div> </Link>
    </div>
  );
}
