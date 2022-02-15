import { createContext } from "react";
import helixClient from 'helix-client';

const HelixContext = createContext({
	client: new helixClient(),
	setClient: () => {},
});

export default HelixContext;