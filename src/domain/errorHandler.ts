export const throwInvalidParameterError = (param: string): never => {
	throw new Error(`Invalid parameter: ${param}`);
};
