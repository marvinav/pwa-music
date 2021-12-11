import React from 'react';

import { Layer } from '@/shared/ui';

import { dropDownContainer, dropDownMenu } from './index.css';

export interface DropDownProperties {
    Host: React.ComponentType;
    isOpen?: boolean;
}

export const DropDown: React.FC<DropDownProperties> = ({ children, Host, isOpen }) => {
    const [open, setOpen] = React.useState(isOpen);
    const reference = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <div
            role="button"
            tabIndex={0}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpen(false);
                }
            }}
            onFocus={() => {
                setOpen(true);
            }}
            onMouseDown={(event) => {
                if (!reference.current?.contains(event.target as Element)) {
                    setOpen((o) => !o);
                    if (open) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
            }}
        >
            <Host />
            {open && (
                <div ref={reference} className={dropDownContainer}>
                    <Layer level={0} className={dropDownMenu} fadeIn rounded>
                        {children}
                    </Layer>
                </div>
            )}
        </div>
    );
};
