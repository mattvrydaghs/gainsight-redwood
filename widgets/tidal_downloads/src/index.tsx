import { createRoot } from "react-dom/client";
import type { WidgetSDK } from "./types";
import Card from "./Card";

export default async function init(sdk: WidgetSDK): Promise<void> {
    await sdk.whenReady();

    const root = createRoot(sdk.getContainer());
    root.render(
        <><div>
            <h1>{"Tidal Downloads Widget"}</h1>
            <p>{"This widget displays tidal download information."}</p>
        </div><Card title="Tidal Downloads" links={[
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