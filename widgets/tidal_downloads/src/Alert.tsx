import React from "react";
import { AlertIcon } from "./AlertIcon";

interface AlertProps {
    message: string;
}

export const Alert: React.FC<AlertProps> = ({ message }) => (
    <div className="td-alert">
        <AlertIcon />
        <span><strong>{message}</strong></span>
    </div>
);

export default Alert; 