import React, { useState } from "react";
import { Image, Steps, Popover } from 'antd';
import styles from './steps.module.css'
const { Step } = Steps;

const customDot = (index: any) => (
    <Popover
        content={
            <span>
                Step {index}
            </span>
        }
    >
        <Image style={{ marginTop: -8, marginLeft: -7 }} preview={false} src={`assets/Wizard-Step${index}.png`} width={46} />
    </Popover>
);

const stepsData = [
    {
        id: 1,
        title: "STEP 1:",
        description: "CREATE YOUR ACCOUNT PASSWORD"
    },
    {
        id: 2,
        title: "STEP 2:",
        description: "PERSONAL INFORMATION"
    },
    {
        id: 3,
        title: "STEP 3:",
        description: "EMPLOYMENT DETAILS"
    },
    {
        id: 4,
        title: "STEP 4:",
        description: "UPLOAD DOCUMENTS"
    },
    {
        id: 5,
        title: "STEP 5:",
        description: "COMPLETE"
    }
]

export const StepsComponent: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const onChange = (current: any) => {
        console.log('onChange:', current);
        setCurrentStep(current)
    };

    return (
        <>
            <Steps
                size="default"
                current={currentStep}
                onChange={onChange}
                labelPlacement='vertical'
                className={styles.authentication_steps}
                //progressDot={customDot}
                responsive
            >
                {stepsData.map((value, index) => <Step key={'account_step_'+value.id}
                    title={<p style={{ whiteSpace: 'pre-wrap', color: currentStep === value.id-1 ? '#1890FF' : '#272727' }}>{value.title} {value.description}</p>}
                    icon={customDot(value.id)}
                //subTitle="This is a description"
                //description="This is a description ."
                />)
                }
            </Steps>
        </>
    );
};
