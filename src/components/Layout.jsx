import React from 'react';

export const Layout = ({ children, classes }) => {
    return <div className={`pt-[180px] md:pt-24 min-h-screen w-full ${classes}`}>{children}</div>;
};
