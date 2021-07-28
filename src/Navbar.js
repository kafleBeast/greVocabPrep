import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>GRE Verbal, Road to 160+</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/Quiz" style={{ 
          color: 'white', 
          backgroundColor: '#FF5E5E',
          borderRadius: '8px' 
        }}>Quiz</Link>
        <Link to="/Definition" style={{ 
          color: 'white', 
          backgroundColor: '#FF5E5E',
          borderRadius: '8px' 
        }}>Definition</Link>
        <Link to="/Synonym" style={{ 
          color: 'white', 
          backgroundColor: '#FF5E5E',
          borderRadius: '8px' 
        }}>Synonym</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;