import { useRef, useState } from "react";
import { useClickAway } from "react-use";

export default function useToggleComponentVisibility(initialVisible: boolean) {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => setIsVisible(false);
  useClickAway(ref, handleOutsideClick, ["click"]);

  return { ref, isVisible, setIsVisible };
}
