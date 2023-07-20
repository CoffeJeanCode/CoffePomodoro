import { DependencyList, useEffect } from "react";

const useChangeFavIcon = (
  path: { original: string; new: string },
  size: number,
  deps: DependencyList
) => {
  useEffect(() => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement;
    const faviconSize = size;

    if (!favicon) return;

    const canvas = document.createElement("canvas");
    canvas.width = faviconSize;
    canvas.height = faviconSize;

    const context = canvas.getContext("2d");
    const img = document.createElement("img");
    console.log(path);
    img.src = path.new;

    img.onload = () => {
      if (!context) return;
      context.drawImage(img, 0, 0, faviconSize, faviconSize);
      favicon.href = canvas.toDataURL("image/png");
    };

    return () => {
      favicon.href = path.original;
      context?.clearRect(0, 0, faviconSize, faviconSize);
    };
  }, deps);
};

export default useChangeFavIcon;
