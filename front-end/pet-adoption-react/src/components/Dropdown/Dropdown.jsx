import "./Dropdown.css";
import { Between } from "../../UIKit/Layouts/Between/Between";
import { useState, useEffect } from "react";
import { Icon } from "../Icon/Icon";

export const Dropdown = ({ list, selected, onChange, placeholder }) => {
  const [isDisp, setIsDisp] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []);

  const handleBodyClick = () => {
    setIsDisp(false);
  };
  const handleToggle = (e) => {
    e.stopPropagation();
    setIsDisp(!isDisp);
  };

  const handleSelect = (item) => {
    onChange(item.id);
    setIsDisp(false);
  };

  const renderList = () => {
    return list.map((item) => {
      return (
        <h4
          className={item.id === selected ? "selected" : ""}
          key={item.id}
          onClick={() => handleSelect(item)}
        >
          {item.value}
        </h4>
      );
    });
  };

  const renderHeader = () => {
    if (selected) {
      const item = list.find((i) => i.id === selected);
      if (item) {
        return item.value;
      }
    }

    return `${placeholder}`;
  };
  return (
    <div className="Dropdown">
      <div className="header" onClick={handleToggle}>
        <Between>
          <h3>{renderHeader()}</h3>

          <Icon i="expand_more" />
        </Between>
      </div>
      {isDisp && <div className="list ">{renderList()}</div>}
    </div>
  );
};
