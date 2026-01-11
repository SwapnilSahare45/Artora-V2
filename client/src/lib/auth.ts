export async function isAuthenticated(token: string): Promise<{
  success: boolean;
  isAuthenticated: boolean;
  user?: { userId: string; role: string };
  error?: string;
}> {
  try {
    if (!token) {
      return {
        success: false,
        isAuthenticated: false,
        error: "No token provided",
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/authenticatedUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        isAuthenticated: false,
        error: "Invalid token",
      };
    }

    const data = await response.json();
    return {
      success: true,
      isAuthenticated: data.isAuthenticated,
      user: data.user,
    };
  } catch (error) {
    return {
      success: false,
      isAuthenticated: false,
      error: "Authentication check failed",
    };
  }
}
