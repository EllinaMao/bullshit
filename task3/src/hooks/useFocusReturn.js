import { use, useEffect, useRef } from "react";

export const useFocusReturn = (isOpen) => {
    const lastFocusedElement = useRef(null);

    useEffect(() => {
        if (isOpen) {
            lastFocusedElement.current = document.activeElement;
        }
        else {
            if (lastFocusedElement.current) {
                setTimeout(() => lastFocusedElement.current.focus(), 0);
            }
        }
    }, [isOpen]);
};