import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkElement({ children, to }: any) {
    return (
        <Link to={to}>
            {children}
        </Link>
    )
}