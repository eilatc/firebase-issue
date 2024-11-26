import React, { useState, useEffect } from 'react';
import { Typography, Spin, Steps, Button } from 'antd';
import {StepConfig} from "../types/MultiStepsLoading";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

const { Step } = Steps;

interface MultiStepLoadingProps {
    steps: StepConfig[];
    onComplete?: () => void; // Callback when all steps are complete
}

const MultiStepLoading: React.FC<MultiStepLoadingProps> = ({ steps, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0); // Tracks the current step index
    const [stepStatuses, setStepStatuses] = useState<
        Array<{ status: 'waiting' | 'loading' | 'success' | 'failure'; text: string }>
    >(
        steps.map((step) => ({ status: 'waiting', text: step.loadingText }))
    );

    useEffect(() => {
        const executeStep = async (stepIndex: number) => {
            if (stepIndex >= steps.length) {
                onComplete?.();
                return;
            }

            // Update current step to "loading"
            setStepStatuses((prev) =>
                prev.map((step, index) =>
                    index === stepIndex ? { ...step, status: 'loading' } : step
                )
            );

            try {
                const successText = await steps[stepIndex].asyncFunction(); // Get the dynamic success text
                setStepStatuses((prev) =>
                    prev.map((step, index) =>
                        index === stepIndex ? { status: 'success', text: successText } : step
                    )
                );
                setCurrentStep(stepIndex + 1); // Proceed to the next step
            } catch (error) {
                setStepStatuses((prev) =>
                    prev.map((step, index) =>
                        index === stepIndex ? { status: 'failure', text: steps[stepIndex].failureText } : step
                    )
                );
            }
        };

        executeStep(currentStep); // Execute the current step
    }, [currentStep, steps, onComplete]);

    return (
        <div style={{marginTop: '20px'}}>
            <Steps current={currentStep} direction="vertical">
                {steps.map((step, index) => {
                    const { status, text } = stepStatuses[index];
                    let icon: React.ReactNode = <Spin size="small" />;

                    if (status === 'success') {
                        icon = <CheckCircleOutlined style={{ color: 'green' }} />;
                    } else if (status === 'failure') {
                        icon = <CloseCircleOutlined style={{ color: 'red' }} />;
                    }

                    return (
                        <Step
                            key={step.key}
                            title={text}
                            description={index === currentStep ? 'בתהליך...' : ''}
                            icon={icon}
                        />
                    );
                })}
            </Steps>
            {stepStatuses[currentStep]?.status === 'failure' && (
                <Button
                    type="primary"
                    onClick={() => setStepStatuses((prev) =>
                        prev.map((step, index) =>
                            index === currentStep ? { ...step, status: 'waiting' } : step))}
                >
                    נסה שוב
                </Button>
            )}
        </div>
    );
};

export default MultiStepLoading;
