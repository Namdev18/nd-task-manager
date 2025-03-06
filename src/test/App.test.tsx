import React from "react";
import { render, act, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../redux/store";
import "@testing-library/jest-dom";

describe("App Component", () => {
    test("App Component Loaded successfully", async () => {
        let container;
        await act(async () => {
            const result = render(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            container = result.container;
        });
        expect(container).toMatchSnapshot();
    });

    test("App Component have no tasks before api call fetched the component", async () => {
        let renderedComp;
        let container;
        await act(async () => {
            const result = render(
                <Provider store={store}>
                    <App />
                </Provider>
            );
            renderedComp = result;
            container = result.container;
        });
        if (renderedComp) {
            const elem = screen.getAllByText(/No tasks available/i)?.[0];
            expect(elem).toBeInTheDocument();
        }
    });
});