import { Portal } from "./portals/Portal";
import { PORTAL_LAYERS } from "./portals/PORTAL_LAYERS";
import { useFocusReturn } from "../../hooks/useFocusReturn";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import { useRef } from "react";

export function Modal({ isOpen, onClose, children }) {
    const nodeRef = useRef(null);
    useFocusReturn(isOpen);

    useEscapeKey(() => {
        if (isOpen) {
            onClose();
        }
    });

    return (
        <Portal id={PORTAL_LAYERS.modal}>
            <div className="modal-overlay" onClick={onClose} ref={nodeRef}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {children}
                    <button
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="Close Modal"
                    >
                        &times;
                    </button>
                </div>
            </div>
        </Portal>
    );
}
