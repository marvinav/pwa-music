import React from 'react';

export interface WindowProps {
    title: string;
    onClose: () => void;
    onMimimize: () => void;
    onOpen: () => void;
}

export const Window: React.FC<WindowProps> = (_props) => {
    return <div></div>;
};
