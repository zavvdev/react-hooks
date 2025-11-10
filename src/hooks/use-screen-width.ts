import { useEffect, useState } from "react";

export function useScreenWidth() {
  var { 0: screenWidth, 1: setScreenWidth } = useState<number>(
    window.innerWidth,
  );

  useEffect(() => {
    var handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
}
