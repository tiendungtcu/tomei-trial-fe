import React from "react";

import { Header, Main, Cards, Footer, StepsComponent } from "@components";
import Head from 'next/head'

const Home: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet" />
            </Head>
            <Header />
            <StepsComponent />
            <Main />
            <Cards />
            <Footer />
        </div>
    );
};

export default Home;
