import React from 'react';
import './index.scss';

export interface IListProps {}

export const List: React.FC<IListProps> = (props) => {
    console.log(props.children);
    return (
        <div className="list">
            {React.Children.map(props.children, (child) => {
                return <div className="list-item">{child}</div>;
            })}
        </div>
    );
};
