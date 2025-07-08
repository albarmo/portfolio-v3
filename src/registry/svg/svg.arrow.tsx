import type { I_SVGProps } from "./constant";
import { checkColor } from "./function";

export const SVG_ArrowLeft = ({ className = "", color }: I_SVGProps) => {
  const CHECK_COLOR = checkColor(color);
  return (
    <svg
      className={className}
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={CHECK_COLOR}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 6.50014C15.5 6.93052 15.1526 7.27943 14.7241 7.27943L1.27586 7.27943C0.847378 7.27943 0.5 6.93052 0.5 6.50014C0.5 6.06977 0.847378 5.72086 1.27586 5.72086L14.7241 5.72086C15.1526 5.72086 15.5 6.06977 15.5 6.50014Z"
      />
      <path
        fill={CHECK_COLOR}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.05035 0.729623C7.35252 1.03471 7.35128 1.52812 7.04755 1.83169L2.37624 6.50035L7.04755 11.1683C7.35128 11.4718 7.35252 11.9652 7.05035 12.2703C6.74818 12.5755 6.2569 12.5767 5.95307 12.2731L0.728935 7.05292C0.58266 6.90662 0.5 6.70754 0.5 6.50014C0.5 6.29275 0.582556 6.09429 0.728935 5.94799L5.95307 0.72688C6.2568 0.423301 6.74807 0.424537 7.05035 0.729623Z"
      />
    </svg>
  );
};
