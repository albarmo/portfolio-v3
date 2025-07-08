import type { I_SVGProps } from "./constant";
import { checkColor } from "./function";

export const SVG_Close = ({ className = "", color }: I_SVGProps) => {
  const CHECK_COLOR = checkColor(color);
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={CHECK_COLOR}
        d="M16.5355 17.95L12 13.4144L7.46444 17.95C7.07553 18.3389 6.43914 18.3389 6.05023 17.95C5.66132 17.5611 5.66132 16.9247 6.05023 16.5358L10.5858 12.0002L6.05023 7.46468C5.66132 7.07578 5.66132 6.43938 6.05023 6.05047C6.43914 5.66156 7.07553 5.66156 7.46444 6.05047L12 10.586L16.5355 6.05047C16.9244 5.66156 17.5608 5.66156 17.9497 6.05047C18.3386 6.43938 18.3386 7.07578 17.9497 7.46468L13.4142 12.0002L17.9497 16.5358C18.3386 16.9247 18.3386 17.5611 17.9497 17.95C17.5608 18.3389 16.9244 18.3389 16.5355 17.95Z"
      />
    </svg>
  );
};
