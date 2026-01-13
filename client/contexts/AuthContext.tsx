import { createContext, Dispatch, SetStateAction, useState } from "react";

export const AuthContext = createContext<{ username: string } | null>(null);
export const AuthSetContext = createContext<
  Dispatch<SetStateAction<{ username: string } | null>> | (() => void)
>(() => {
  throw "Set function not provided";
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(
    null
  );

  return (
    <AuthContext value={currentUser}>
      <AuthSetContext value={setCurrentUser}>{children}</AuthSetContext>
    </AuthContext>
  );
}
