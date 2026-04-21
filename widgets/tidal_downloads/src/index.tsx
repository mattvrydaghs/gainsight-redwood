import { createRoot } from "react-dom/client";
import type { WidgetSDK } from "./types";

import { App } from "./App";

export default async function init(sdk: WidgetSDK): Promise<void> {

    await sdk.whenReady();

    const root = createRoot(sdk.getContainer());
    root.render(
        <App sdk={sdk} />
    );
    
    sdk.on("destroy", () => {
        root.unmount();
    });
}