import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  //Declaring Two States for Re-rendering the lists
  const [leftList, setLeftList] = useState([
    { value: "Apples", selected: false },
    { value: "Bananas", selected: false },
    { value: "Oranges", selected: false },
  ]);
  const [rightList, setRightList] = useState([
    { value: "Grapes", selected: false },
    { value: "Tomato", selected: false },
    { value: "Lemons", selected: false },
  ]);

  //Check which object is selected and update it in respective side list
  const onChangeHandler = (item, list) => {
    const newList = list.map((listItem) =>
      listItem === item
        ? { ...listItem, selected: !listItem.selected }
        : listItem,
    );
    if (list === leftList) {
      setLeftList(newList);
    } else {
      setRightList(newList);
    }
  };

  //Moving the selected objects to the Left side from the Right side
  const handleLeftShift = () => {
    const selectedItems = rightList.filter((item) => item.selected);
    const updatedRightItems = rightList.filter((item) => !item.selected);
    setRightList(updatedRightItems);
    setLeftList([...leftList, ...selectedItems]);
  };

  //Moving the selected objects to the Right side from the Left side
  const handleRightShift = () => {
    const selectedItems = leftList.filter((item) => item.selected);
    const updatedleftList = leftList.filter((item) => !item.selected);
    setLeftList(updatedleftList);
    setRightList([...rightList, ...selectedItems]);
  };

  //Event Delegation for Right Shift & Left Shift
  const handleClick = (event) => {
    switch (event.target.className) {
      case "right-shift":
        handleRightShift();
        break;
      case "left-shift":
        handleLeftShift();
        break;
    }
  };
  return (
    <section className="App">
      <header>
        <h1 style={{ textTransform: "uppercase" }}>Checklist</h1>
      </header>
      <div className="checklist-container">
        <div className="left">
          <ul>
            {/* Displaying the values of Left side list} */}
            {leftList.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  value={item.value}
                  checked={item.selected || false}
                  onChange={() => onChangeHandler(item, leftList)}
                />
                <label htmlFor={item.value}>{item.value}</label>
              </li>
            ))}
          </ul>
        </div>
        {/* Shifting buttons*/}
        <div className="middle" onClick={handleClick}>
          <button className="right-shift" id="right-shift">
            <span className="right-shift">&gt;&gt;&gt;</span>
          </button>
          <button className="left-shift" id="left-shift">
            <span className="left-shift">&lt;&lt;&lt;</span>
          </button>
        </div>
        <div className="right">
          <ul>
            {/* Displaying the values of Right side list} */}
            {rightList.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  value={item.value}
                  checked={item.selected || false}
                  onChange={() => onChangeHandler(item, rightList)}
                />
                <label htmlFor={item.value}>{item.value}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
