import { useState } from "react";
import { CSSTransition } from 'react-transition-group';

export const DropdownMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="dropdown">
      <button onClick={() => setShowDropdown(!showDropdown)}>Toggle Algorithms</button>
      <CSSTransition in={showDropdown} timeout={1000} classNames="fade" unmountOnExit>
        <div className="dropdown-content">
          <div className="dropdown-item-wrapper"> 
            <button className="dropdown-item" onClick={() => { /* Handle algorithm click */ }}>Dijkstra</button>
            <button className="dropdown-item" onClick={() => { /* Handle algorithm click */ }}>BST</button>
            <button className="dropdown-item" onClick={() => { /* Handle algorithm click */ }}>Bellman Ford</button>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
