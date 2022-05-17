import react from "react";
import Router from "next/router";

export default class Home extends react.Component {  

  componentDidMount = () => {
    Router.replace("/dfa");
  };

  render = () => (
      <div>
        You are being redirected to /dfa page.
      </div>
  )
}

// home page will be redirected to dfa page automatically.
// we cannot use router.redirect() in component because of pre-rendering.
// export async function getServerSideProps(context) {
//   return {
//     redirect: {
//       destination: "/dfa",
//       permanent: false
//     }
//   };
// }