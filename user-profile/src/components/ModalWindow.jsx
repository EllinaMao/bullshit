import { Portal } from '../portal/Portal';
import { PORTAL_LAYERS } from '../portal/PORTAL_LAYERS';
import { Button, Modal } from 'react-bootstrap';

export function ModalWindow({
    //visibility and control
    show,          
    onHide,         
    title,
    children,

    //customization for footer
    footer,  
    showDefaultFooter = true, 
    closeButtonLabel = "Close",

    portalId = PORTAL_LAYERS.modal,
    ...props
}) {
    return (
        <Portal id={portalId}>
            <Modal
                show={show}
                onHide={onHide}
                {...props}
            >
                {title && (
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                )}

                <Modal.Body>
                    {children}
                </Modal.Body>

                {(footer || showDefaultFooter) && (
                    <Modal.Footer>
                        {footer ? footer : (
                            <Button variant="secondary" onClick={onHide}>
                                {closeButtonLabel}
                            </Button>
                        )}
                    </Modal.Footer>
                )}
            </Modal>
        </Portal>
    );
}