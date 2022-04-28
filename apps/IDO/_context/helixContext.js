import { createContext } from "react";
import {HelixClient} from "helix-clients";

const HelixContext = createContext({
	client: new HelixClient(),
	setClient: () => {},
});

export default HelixContext;