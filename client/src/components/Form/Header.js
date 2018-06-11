import React from "react";

export const Header = props => (
    <div className="card-header">
        <header class="text-center" {...props}>{props.children}</header>
    </div>
);