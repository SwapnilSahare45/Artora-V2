"use server";

export async function registerAction(prevState: any, data: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Registration failed",
      };
    }

    return {
      success: true,
      result,
    };
  } catch (error) {
    return { success: false, error: "Registration failed" };
  }
}

export async function verifyOTPAction(prevState: any, data: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verifyOTP`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Invalid security key",
      };
    }

    return {
      success: true,
      result,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "OTP verification failed",
    };
  }
}

export async function resendOTPAction(prevState: any, data: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resendOTP`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || "Failed to resend OTP",
      };
    }

    return { success: true, result };
  } catch (error) {
    return { success: false, error: "OTP resend failed" };
  }
}
