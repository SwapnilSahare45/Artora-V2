// =============== User Types ===============
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  bio?: string;
  avatar?: string;
  role: "artist" | "collector" | "admin";
  googleId?: string;
  githubId?: string;
  provider: "local" | "google" | "github";
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// For API responses
export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  avatar?: string;
  role: "artist" | "collector" | "admin";
  provider: "local" | "google" | "github";
  createdAt: Date;
  updatedAt: Date;
}

// For registration
export interface IRegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "artist" | "collector";
}

// For Login
export interface ILoginInput {
  email: string;
  password: string;
}

// For profile update
export interface IUserUpdateInput {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatar?: string;
}
