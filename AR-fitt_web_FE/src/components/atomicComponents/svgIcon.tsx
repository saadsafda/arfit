import React, { useEffect, useState } from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";

interface Props extends SvgIconProps {
  src: string;
}

const SvgIconFromPublic: React.FC<Props> = ({ src, ...props }) => {
  const [svgContent, setSvgContent] = useState<string>("");

  const loadSvg = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const text = await response.text();
    return text;
  };

  useEffect(() => {
    loadSvg(src).then(setSvgContent);
  }, [src]);

  return (
    <SvgIcon {...props}>
      <g dangerouslySetInnerHTML={{ __html: svgContent }} />
    </SvgIcon>
  );
};

export default SvgIconFromPublic;
