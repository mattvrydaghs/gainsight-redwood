import { useEffect, useState } from "react";
import type { WidgetSDK, WidgetProps } from "./types";
import { Card } from "./Card";

export function App({sdk}: {sdk: WidgetSDK}) {
    const [props, setProps] = useState<WidgetProps>(sdk.getProps());
    const [isReady, setReady] = useState(false);

    useEffect(() => {
            //@ts-ignore
            if (typeof window.WidgetServiceSDK !== "function") {
                const script = document.createElement("script");
                script.src = "https://static.customer-hub.northpass.com/widget-sdk/latest/index.umd.js";
                document.head.appendChild(script);
                new Promise(resolve => script.onload = resolve).then(() => {
                    setReady(true);
                });
            } else {
                setReady(true);
            }
        }, [isReady]);
    useEffect(() => {
        if (isReady) {
            new window.WidgetServiceSDK().connectors.execute({
                permalink: "salesforce",
                method: "GET",
            }).then((data) => {
                console.log("Tidal Downloads Data:", data);
            }).catch((error) => {
                console.error("Error fetching tidal downloads data:", error);
            });
        }
    }, [isReady]);
    useEffect(() => sdk.on("propsChanged", setProps), [sdk]);
    return (
        <><div>
            <h1>{"Tidal Downloads Widget"}</h1>
            <p>{"This widget displays tidal download information. Is ready? {" + isReady + "}"}</p>
        </div>
        <Card title="Tidal Downloads" links={[
            {
                label: "Download Tidal Data",
                url: "https://example.com/tidal-data.csv",
            },
            {
                label: "Tidal Data API",
                url: "https://api.example.com/tidal-data",
                hotfix: true,
            }
        ]} /></> 
    );
}