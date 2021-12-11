import React from 'react';

import { Layer } from '@/shared/ui';

import { dropDownContainer, dropDownMenu } from './index.css';

export interface DropDownProperties {
    host: Element | React.ReactNode;
    isOpen?: boolean;
}

export const DropDown: React.FC<DropDownProperties> = ({ children, host, isOpen }) => {
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
            {host}
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
