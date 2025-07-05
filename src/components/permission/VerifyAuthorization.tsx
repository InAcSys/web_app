import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../../contexts";
import { useNavigate } from "react-router";

interface Props {
  authorization: string;
  children: ReactNode;
}

export const VerifyAuthorization = ({ authorization, children }: Props) => {
  const { verifyPermission, permissions } = useAuthContext();
  const [result, setResult] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!permissions) return;
    const hasAuthorization = verifyPermission(authorization);
    if (hasAuthorization) {
      setResult(hasAuthorization);
    } else {
      navigate("/error", { state: { code: 403 } });
    }
  }, [permissions, authorization, verifyPermission]);

  return <>{result ? children : <></>}</>;
};
