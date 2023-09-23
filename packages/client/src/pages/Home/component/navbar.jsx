// src/components/Navbar.jsx

export const Navbar = () => {
    return (
      <div style={{ backgroundColor: "grey", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="team-name" style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
          Algo-Shadow
        </div>
        <nav>
          <a href="#" style={{ marginLeft: "20px", color: "white", textDecoration: "none" }}>Home</a>
          <a href="#" style={{ marginLeft: "20px", color: "white", textDecoration: "none" }}>About</a>
          <a href="#" style={{ marginLeft: "20px", color: "white", textDecoration: "none" }}>Contact</a>
        </nav>
      </div>
    );
  };
  