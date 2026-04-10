import { createRoot } from "react-dom/client";
import type { WidgetSDK } from "./types";

export default async function init(sdk: WidgetSDK): Promise<void> {
    await sdk.whenReady();

    const root = createRoot(sdk.getContainer());
    root.render(
        <div>
            <h1>{"Tidal Downloads Widget"}</h1>
            <p>{"This widget displays tidal download information."}</p>
        </div>
    );

    sdk.on("destroy", () => {
        root.unmount();
    });
}