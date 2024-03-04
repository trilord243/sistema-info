import { useState, useEffect } from "react";
import { Svg1 } from "./Svg1";
import { Svg2 } from "./Sgv2";
import { Svg3 } from "./Svg3";
import { Svg4 } from "./Svg4";
import { Svg5 } from "./Svg.5";

const Loader = () => {
  const svgs = [<Svg1 />, <Svg2 />, <Svg3 />, <Svg4 />, <Svg5 />];
  const [opacities, setOpacities] = useState([1, 0, 0, 0, 0]);

  useEffect(() => {
    let currentSvg = 0;

    const interval = setInterval(() => {
      setOpacities((prevOpacities) => {
        const newOpacities = prevOpacities.map((_, index) =>
          index === (currentSvg + 1) % svgs.length ? 1 : 0
        );

        return newOpacities;
      });

      currentSvg = (currentSvg + 1) % svgs.length;
    }, 900);

    return () => clearInterval(interval);
  }, [svgs.length]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative w-48 h-48">
        {" "}
        {/* Ajusta el tamaño según sea necesario */}
        {svgs.map((SvgComponent, index) => (
          <div
            key={index}
            className="absolute duration-500 ease-in-out"
            style={{
              opacity: opacities[index],
              transition: "opacity 500ms ease-in-out",
              width: "100%",
              height: "100%",
            }}
          >
            {SvgComponent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
