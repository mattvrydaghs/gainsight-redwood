import { createRoot } from "react-dom/client";
import type { WidgetSDK } from "./types";
import Card from "./Card";
import React, { useEffect } from "react";

export default async function init(sdk: WidgetSDK): Promise<void> {
    const [isReady, setReady] = React.useState(false);
    await sdk.whenReady();
    
    
    useEffect(() => {
        //@ts-ignore
        if (typeof window.WidgetServiceSDK !== "function") {
            const script = document.createElement("script");
            script.src = "https://static.customer-hub.northpass.com/widget-sdk/latest/index.umd.js";
            document.head.appendChild(script);
            new Promise(resolve => script.onload = resolve).then(() => {
                setReady(true);
            });
        }
    }, [isReady]);

    const root = createRoot(sdk.getContainer());
    root.render(
        <><div>
            <h1>{"Tidal Downloads Widget"}</h1>
            <p>{"This widget displays tidal download information. Is ready? {" + isReady + "}"}</p>
        </div>
        <Card title="Tidal Downloads" links={[
            {
                label: "Download Tidal Data",
                url: "https://example.com/tidal-data.csv",
            },
        ]} /></> 
    );

    sdk.on("destroy", () => {
        root.unmount();
    });
}