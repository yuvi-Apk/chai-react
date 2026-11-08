import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

/**
 * Route guard.
 * - authentication = true  → page requires a logged-in user (redirects to /login)
 * - authentication = false → page is for guests only, e.g. login/signup (redirects to /)
 */
const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Protected;
