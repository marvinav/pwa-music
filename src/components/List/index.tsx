import React from 'react';
import './index.scss';

export const List: React.FC = (props) => {
    return (
        <div className="list">
            {React.Children.map(props.children, (child) => {
                return <div className="list-item">{child}</div>;
            })}
        </div>
    );
};
