Next JS routing system is all based on pages directory

Using NextJS Apollo with GraphQL

No need to have import React from "react";
Babel will automatically import react
next/babel has preset-react which import react. You could even import typescript

Prefetch is true by default. It prefectehs the links

Dynamic routing is very useful by using [route_name]

Server side rendering

wrapping apollo in a higher order component

Recommended: getStaticProps or getServerSideProps

If you're using Next.js 9.3 or newer, we recommend that you use getStaticProps or getServerSideProps instead of getInitialProps.

Cannot use nested styled components
