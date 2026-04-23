import { useEffect, useState } from "react";
import type { WidgetSDK, WidgetProps } from "./types";
import { Card } from "./Card";
import Header from "./Header";
import Alert from "./Alert";
import { Dropdown } from "./Dropdown";

export function App({sdk}: {sdk: WidgetSDK}) {
    const [props, setProps] = useState<WidgetProps>(sdk.getProps());
    const [isReady, setReady] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState<string | number>();

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

    const handleVersionChange = (value: string | number) => {
        setSelectedVersion(value);
        // Update the props with the new version
        const updatedProps = { ...props, version: value };
        setProps(updatedProps);
        // Emit the change through the SDK to notify the widget container
        sdk.emit("propsChanged", updatedProps);
    };
    return (
        <>
            <div className="td-panel">
            <Header product_name="Tidal Automation" release_date="Feb 32, 2026" isLatest={true} version="2026.99" />
            <Alert message="This is from React!" />
            <Dropdown
              label="Select Version"
              options={[
                { label: "Version 2026.99", value: "2026.99" },
                { label: "Version 2026.1", value: "2026.1" },
                { label: "Version 2025.12", value: "2025.12" },
              ]}
              value={selectedVersion}
              onChange={handleVersionChange}
              placeholder="Choose a version..."
            />
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
            ]} />
            </div>
        </> 
    );
}