import React, {useState} from "react";
import "./Toggle.css";

export default function Toggle({isActive, onToggle}) {
  return (
    <div
      className={`toggle-container ${isActive ? "active" : "inactive"}`}
      onClick={onToggle}
    >
      <div className="toggle-label"></div>
      <div className="toggle-thumb" />
      <div className="toggle-label"></div>
    </div>
  );
}
