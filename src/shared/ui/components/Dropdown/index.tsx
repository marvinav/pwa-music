import React from 'react';

import { Layer } from '@/shared/ui';

export interface DropDownProperties {
    Host: React.ComponentType<{ onClick: () => void }>;
    isOpen?: boolean;
}

export const DropDown: React.FC<DropDownProperties> = ({ children, Host, isOpen }) => {
    const [open, setOpen] = React.useState(isOpen);

    React.useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <div>
            <Host
                onClick={() => {
                    setOpen((o) => !o);
                }}
            />
            {open && <Layer level={0}>{children}</Layer>}
        </div>
    );
};
