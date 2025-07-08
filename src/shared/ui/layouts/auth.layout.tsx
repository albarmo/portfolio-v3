"use client";

import React, {
    type FC,
    Fragment,
    type PropsWithChildren,
} from "react";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <main className="dark:bg-neutral-900">{children}</main>
        </Fragment>
    );
};

export default AuthLayout;