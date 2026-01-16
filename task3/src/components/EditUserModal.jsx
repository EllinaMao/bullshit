import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ModalWindow } from "./ModalWindow"; //
import FormInput from "./FormInput";       //

export const EditUserModal = ({ 
  fieldKey, 
  initialValue, 
  config, 
  onSave, 
  onClose 
}) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue, fieldKey]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSave(fieldKey, inputValue);
  };

  if (!fieldKey) return null;

  return (
    <ModalWindow
      show={!!fieldKey}
      onHide={onClose}
      title={`Edit ${config?.label || fieldKey}`}
      backdrop="static"
      footer={
        <>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label={config?.label}
          type={config?.type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          autoFocus
        />
      </form>
    </ModalWindow>
  );
};