import React, { StrictMode, useState } from "https://esm.sh/react";
import { createRoot } from "https://esm.sh/react-dom/client";
createRoot(document.getElementById("root")).render(React.createElement(StrictMode, null,
    React.createElement("main", null,
        React.createElement("div", { className: "grid" },
            React.createElement(LedControl, { icon: "sun", label: "Brightness", id: "brightness", name: "brightness", value: 30 }),
            React.createElement(LedControl, { icon: "audio", label: "Volume", id: "volume", name: "volume", value: 20 })))));
function LedControl({ icon, label, id, name, value = 0 }) {
    const [val, setVal] = useState(value);
    const clipIncrements = 44;
    const clip = 1 - val / clipIncrements;
    const clipPercent = clip * 100;
    const clipA = {
        clipPath: `polygon(0 0,100% 0,100% ${clipPercent}%,0 ${clipPercent}%)`
    };
    const clipB = {
        clipPath: `polygon(0 ${clipPercent}%,100% ${clipPercent}%,100% 100%,0 100%)`
    };
    return (React.createElement("div", { className: "led-control" },
        React.createElement("div", { className: "led-control__layer-wrap" },
            React.createElement("div", { className: "led-control__layer", style: clipA },
                React.createElement("div", { className: `led-control__icon led-control__icon--${icon}` })),
            React.createElement("div", { className: "led-control__layer led-control__layer--inverted", style: clipB },
                React.createElement("div", { className: `led-control__icon led-control__icon--${icon}` }))),
        React.createElement("label", { className: "led-control__label", htmlFor: name }, label),
        React.createElement("input", { className: "led-control__input", type: "range", id: id, name: name, value: val, step: 1, min: 0, max: clipIncrements, onChange: e => setVal(+e.target.value) })));
}