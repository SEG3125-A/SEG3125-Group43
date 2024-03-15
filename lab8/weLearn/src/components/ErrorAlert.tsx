import React from "react";
import { useEffect, useState } from "react";

const ErrorAlert = ({ error }: { error: string }) => {
    const [showAlert, setShowAlert] = useState(true);
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(countdownTimer);
        };
    }, []);

    return (
        <>
            {showAlert && (
                <div role="alert" className="alert alert-error absolute z-50">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-4 align-middle mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{error}</span>
                    <div className="bg-gray-300 h-2 mt-2">
                        <div
                            className="bg-red-500 h-full"
                            style={{ width: `${(countdown / 10) * 100}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ErrorAlert;