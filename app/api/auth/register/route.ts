// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export async function POST(req: Request) {
  try {
    const { email, password, name, username } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const clientId = process.env.COGNITO_CLIENT_ID;
    const region = process.env.COGNITO_REGION ?? "us-east-1";

    if (!clientId) {
      console.error("Missing COGNITO_CLIENT_ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const client = new CognitoIdentityProviderClient({ region });

    const command = new SignUpCommand({
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "name", Value: name },
        { Name: "preferred_username", Value: username || email },
      ],
    });

    const response = await client.send(command);

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userConfirmed: response.UserConfirmed,
    });
  } catch (error: any) {
    console.error("Cognito Registration Error:", error);
    
    // Parse common Cognito errors
    let errorMessage = "Failed to register user";
    if (error.name === "UsernameExistsException") {
      errorMessage = "An account with this email already exists";
    } else if (error.name === "InvalidPasswordException") {
      errorMessage = "Password does not meet requirements";
    }

    return NextResponse.json(
      { error: errorMessage, details: error.message },
      { status: 400 }
    );
  }
}
