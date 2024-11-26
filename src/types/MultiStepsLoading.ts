export interface StepConfig {
    key: string; // Unique key for the step
    asyncFunction: () => Promise<string>; // Async function to execute for the step
    loadingText: string; // Text displayed while the step is running
    failureText: string; // Text displayed when the step fails
};
