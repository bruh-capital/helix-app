import { createContext } from "react";
import HelixWrapper from "@hooks/baseLayerHooks";

const clientContext = createContext({
	  client: new HelixWrapper(),
});

export default clientContext;