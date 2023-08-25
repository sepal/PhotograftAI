import { NextResponse } from "next/server";

export type ErrorMessage = {
  message: string;
};

export const createErrorMessage = (message: string, status: number) =>
  NextResponse.json<ErrorMessage>(
    {
      message,
    },
    {
      status,
    }
  );
