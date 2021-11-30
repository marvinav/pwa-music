import React from 'react';

export const List: React.FC = (properties) => {
    return (
        <div className="list">
            {React.Children.map(properties.children, (child) => {
                return <div className="list-item">{child}</div>;
            })}
        </div>
    );
};
