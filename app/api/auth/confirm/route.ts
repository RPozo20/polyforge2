import { NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const clientId = process.env.COGNITO_CLIENT_ID;
    const region = process.env.COGNITO_REGION ?? "us-east-1";

    if (!clientId) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const client = new CognitoIdentityProviderClient({ region });

    const command = new ConfirmSignUpCommand({
      ClientId: clientId,
      Username: email,
      ConfirmationCode: code,
    });

    await client.send(command);

    return NextResponse.json({
      success: true,
      message: "User confirmed successfully",
    });
  } catch (error: any) {
    console.error("Cognito Confirmation Error:", error);
    
    let errorMessage = "Failed to confirm user";
    if (error.name === "CodeMismatchException") {
      errorMessage = "Invalid verification code";
    } else if (error.name === "ExpiredCodeException") {
      errorMessage = "Verification code has expired";
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 400 }
    );
  }
}
