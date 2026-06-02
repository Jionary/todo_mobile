export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  firebaseUuid: string;
  role: "user" | "admin";
};
