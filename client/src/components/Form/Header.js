import React from "react";

export const Header = props => (
    <div className="card-header">
        <header className="text-center" {...props}>{props.children}</header>
    </div>
);