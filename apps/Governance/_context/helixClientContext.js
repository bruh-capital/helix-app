import { createContext } from "react";
import HelixWrapper from "helix-client";

const clientContext = createContext({
	  client: new HelixWrapper(),
});

export default clientContext;