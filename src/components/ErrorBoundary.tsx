import React, { JSX, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAPIError } from "../redux/tasksSlice";
import { RootState } from "../redux/store";

const ErrorBoundary: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { error } = useSelector((state: RootState) => getAPIError(state));

    useEffect(() => {
        if (error) {
            window.alert(error);
            // window.location.reload();
        }
    }, [error]);

    return <>{children}</>;
};

export default ErrorBoundary;