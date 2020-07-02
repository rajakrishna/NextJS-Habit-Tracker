import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import { InMemoryCache } from "apollo-cache-inmemory";

// To set the top level component for the server side rendering
export function withApollo(PageComponent) {
	const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
		const client = apolloClient || initApolloClient(apolloState);

		return (
			<ApolloProvider client={client}>
				<PageComponent {...pageProps} />
			</ApolloProvider>
		);
	};

	// Setting intial props apolloClient, apolloState, ...pageProps
	WithApollo.getInitialProps = async (ctx) => {
		// AppTree gets the data from the getDataFromTree below
		const { AppTree } = ctx;
		const apolloClient = (ctx.apolloClient = initApolloClient());

		let pageProps = {};
		if (PageComponent.getInitialProps) {
			pageProps = await PageComponent.getInitialProps(ctx);
		}
		// If on server. Window doesn't exist in NodeJS so we can be sure that
		// the code is running on the server side
		if (typeof window === "undefined") {
			if (ctx.res && ctx.res.finished) {
				return pageProps;
			}

			try {
				// Wait to get the data first before rendering the page
				const { getDataFromTree } = await import("@apollo/react-ssr");
				// Sending the data to app tree so get into context(ctx)
				await getDataFromTree(
					// Get the whole application and render it but with apolloClient
					<AppTree
						pageProps={{
							...pageProps,
							apolloClient,
						}}
					/>
				);
			} catch (error) {
				console.error(error);
			}
			// to get head you have to clear it
			Head.rewind();
		}
		// getting the apollo state and extracting the client
		const apolloState = apolloClient.cache.extract();
		// After extracting it returns into the apollo component
		return {
			...pageProps,
			apolloState,
		};
	};

	return WithApollo;
}

const initApolloClient = (initialState = {}) => {
	const ssrMode = typeof window === "undefined";
	// Checking if the state exists. If it exists just use it
	const cache = new InMemoryCache().restore(initialState);

	// Setting up the apollo client
	const client = new ApolloClient({
		// ssrMode,
		uri: "http://localhost:3000/api/graphql",
		// Using another API, You can use any API just need the chnage source of the uri
		// uri: "https://www.graphqlhub.com/graphql",
		fetch,
		cache,
	});
	return client;
};
