import React, { useRef, useState } from "react";
import { Header, StepsComponent } from "@components";
import Head from 'next/head'
import { Avatar, Button, Col, Form, Image, Input, Row } from "antd";
import axios from "axios";
const BASE_API_URL = "http://localhost:3000/";
const uploadApi = axios.create({
    baseURL: BASE_API_URL,
});

type RequiredMark = boolean | 'optional';

const labelStyle = { fontFamily: "Open Sans", color: "#C7C7C7", fontSize: "16px", fontWeight: 600 }

const Home: React.FC = () => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
    const inputFileRef = useRef<any>(null);
    const [avatar, setAvatar] = useState('')
    const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const onFileChange = (e: any) => {
        /*Selected files data can be collected here.*/
        console.log(e.target.files);
        var formData = new FormData();
        if (e.target.files.length > 0) {
            formData.append("avatar", e.target.files[0]);
            uploadApi.post('/upload/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => res.data)
                .then(
                    (result) => {
                        const avatarUrl = BASE_API_URL + result.url
                        setAvatar(avatarUrl);
                        console.log(avatarUrl)
                    },
                    (error) => {
                        console.log('upload error', error)
                    },
                );
        }

    }
    const onUploadClick = () => {
        /*Collecting node-element and performing click*/
        inputFileRef.current.click();
    }

    const onFinish = (values: any) => {
        if (values.password !== values.confirmPassword) return alert("Confirm password doesn't match")
        if (!values.email || !values.name) return alert("Input name and email, please")

        uploadApi.post('/api/v1/signup', { ...values, avatar }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.data)
            .then(
                (result) => {
                    alert("Account created successfully!")
                    console.log(result)
                },
                (error) => {
                    console.log('Signup error', error)
                    alert(error.message)
                },
            );
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                padding: "6vw"
            }}
        >
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap" rel="stylesheet" />
            </Head>
            <Header />
            <StepsComponent />
            <div style={{ fontFamily: "Open Sans", height: 30, backgroundColor: "#C5DCFA", textAlign: "center", marginTop: 40, marginBottom: 20 }}>
                <span style={{ color: "#000", fontSize: 21, fontWeight: 600, fontFamily: "Open Sans" }}>
                    CREATE YOUR ACCOUNT
                </span>
            </div>
            <Form
                form={form}
                layout="vertical"
                initialValues={{ requiredMarkValue: requiredMark }}
                onFinish={onFinish}
                onValuesChange={onRequiredTypeChange}
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" sm={24} md={6} style={{ textAlign: "center" }}>
                        <input
                            type="file"
                            ref={inputFileRef}
                            onChange={onFileChange}
                            style={{ display: 'none' }}
                        />
                        <div style={{ textAlign: "center" }}>
                            <Avatar size={150} src={<Image src={avatar || "assets/Avatar.png"} />} />
                        </div>

                        <Button type="text"
                            onClick={onUploadClick}
                            size="large"
                            ghost
                        >
                            <span style={{ fontFamily: "Open Sans", fontSize: 16, fontWeight: "bold", color: '#000' }}> Upload </span>

                        </Button>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={18}>

                        <Row gutter={[32, 8]}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<span style={labelStyle}>NAME </span>}
                                    name="name"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>

                                <Form.Item
                                    label={<span style={labelStyle}>EMAIL </span>}
                                    name="email"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<span style={labelStyle}>PASSWORD </span>}
                                    name="password"
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="confirmPassword"
                                    label={<span style={labelStyle}>CONFIRM PASSWORD </span>}
                                >
                                    <Input size="large" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row justify='end'>
                    <Form.Item style={{
                        padding: 2,
                        backgroundColor: "#C5DCFA",
                        borderRadius: 5,
                        borderColor: "#C5DCFA"
                    }}>
                        <Button
                            type="text"
                            size="large"
                            ghost
                            htmlType="submit"
                        >
                            <span style={{ fontFamily: "Open Sans", fontSize: 16, fontWeight: 600, color: '#0A3977' }}> SAVE & NEXT </span>
                            <Image preview={false} src='assets/arrow-right.png' style={{ marginLeft: 4, marginTop: 4 }} height={20} />
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
            {/*  <Main />
            <Cards /> 
            <Footer />*/}
        </div>
    );
};

export default Home;
