import { createContext } from "react";
import helixClient from 'helix-client';

const HelixContext = createContext({
	client: undefined, // should be a helixClient
	setClient: () => {},
});

export default HelixContext;