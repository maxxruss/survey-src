import React from "react";

interface AppContextInterface {
    [x: string]: any;
}

const { Provider: ServiceProvider, Consumer: ServiceConsumer } =
    React.createContext<AppContextInterface | null>(null);

export { ServiceProvider, ServiceConsumer };
