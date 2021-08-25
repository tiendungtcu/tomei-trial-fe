import React from "react";

import { Image } from "antd";

export const Header: React.FC = () => {
    return (
        <div style={{ marginTop: 20, marginBottom: 30, textAlign: "center" }}>
            <Image src='assets/logo.png' />
        </div>
    );
};
