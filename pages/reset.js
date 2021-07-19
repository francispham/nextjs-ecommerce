import Reset from "../components/Reset";
import RequestReset from "../components/RequestReset";

export default function ResetPage({ query }) {
  if(!query?.token) {
    return <div>
      <p>Sorry must supply a token</p>
      <RequestReset />
    </div>;
  }
  return (
    <div>
      <p>Reset Your Password {query?.token}</p>
      <Reset token={query?.token} />
    </div>
  )
}