import { firebaseConfig } from "./firebase";

type FirebasePasswordLoginResponse = {
  idToken: string;
  refreshToken: string;
  localId: string;
  email: string;
};

type FirebaseErrorResponse = {
  error?: {
    message?: string;
  };
};

export async function loginWithFirebasePassword(
  email: string,
  password: string
) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    }
  );

  const data = (await response.json()) as
    | FirebasePasswordLoginResponse
    | FirebaseErrorResponse;

  if (!response.ok || !("idToken" in data)) {
    const message =
      "error" in data && data.error?.message
        ? data.error.message
        : "No se pudo iniciar sesión con Firebase.";

    throw new Error(message);
  }

  return data;
}
