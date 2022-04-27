import { createContext } from "react";
import {helixClient} from "helix-clients";

const HelixContext = createContext({
	client: new helixClient(),
	setClient: () => {},
});

export default HelixContext;