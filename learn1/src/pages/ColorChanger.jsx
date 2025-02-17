import React from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../redux/slice/colorSlice";

function ColorChanger() {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 p-4">
      <button className="bg-red-100 text-red-600 px-4 py-2 rounded" 
        onClick={() => dispatch(changeColor("#fee2e2"))}>
        Light Red
      </button>
      
      <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded" 
        onClick={() => dispatch(changeColor("#dbeafe"))}>
        Light Blue
      </button>
      
      <button className="bg-green-100 text-green-600 px-4 py-2 rounded" 
        onClick={() => dispatch(changeColor("#d1fae5"))}>
        Light Green
      </button>
    </div>
  );
}

export default ColorChanger;

