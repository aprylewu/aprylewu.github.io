import { Link } from "../router";

export default function NotFound() {
  return (
    <header className="page-head">
      <h1>404</h1>
      <p className="intro">
        This page took a different flight. <Link to="/">Head home</Link>.
      </p>
    </header>
  );
}
