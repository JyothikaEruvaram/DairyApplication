import React from "react";
//import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar=()=>{
    /*const navigate = useNavigate();
    return(
        <div className="navbar">
            <Nav
      activeKey="/home"
      onSelect={(selectedKey) => {
        console.log(`selected ${selectedKey}`);
        switch (selectedKey) {
          case "home":
            navigate("/home");
            break;

          case "my-credentials":
            navigate("/my-credentials");
            break;

            case "logout":
              navigate("/login");
              break;
            

          default:
            break;
        }
      }}
    >
      <Nav.Item>
        <Nav.Link eventKey="home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="my-bookings">My credentials</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="logout">Logout</Nav.Link>
        </Nav.Item>
      
    </Nav>

        </div>
    )
}*/
return(
<div className="navbar">
<ul>
    <li>
        <Link to="/home">Home</Link>
    </li>
    <li>
        <Link to="/my-credentials">my-credentials</Link>
    </li>
</ul>
<button>Logout</button>
</div>
)
}
export default Navbar;