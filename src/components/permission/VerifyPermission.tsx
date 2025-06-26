import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

interface Props {
  permission: string;
  children: ReactNode;
}

export const VerifyPermission = ({ permission, children }: Props) => {
  const { verifyPermission } = useAuthContext();
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    const hasPermission = verifyPermission(permission);
    setResult(hasPermission);
  }, [permission, verifyPermission]);

  return <>{result ? children : <></>}</>;
};
