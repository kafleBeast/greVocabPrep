import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>GRE Verbal, Road to 160+</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/Quiz" >Quiz</Link>
        <Link to="/Definition">Definition</Link>
        <Link to="/Synonym">Synonym</Link>
        <Link to="/Admin">Admin</Link>
        <Link to="/WordSets">Sets</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;