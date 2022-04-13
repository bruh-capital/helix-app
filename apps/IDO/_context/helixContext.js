import { createContext } from "react";
import helixClient from "bruh-clients";

const HelixContext = createContext({
	client: new helixClient(),
	setClient: () => {},
});

export default HelixContext;