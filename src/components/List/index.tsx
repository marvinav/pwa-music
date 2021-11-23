import React from 'react';

export const List: React.FC = (props) => {
    return (
        <div className="list">
            {React.Children.map(props.children, (child) => {
                return <div className="list-item">{child}</div>;
            })}
        </div>
    );
};
