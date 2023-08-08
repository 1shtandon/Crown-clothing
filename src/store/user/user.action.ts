import { AnyAction, PayloadAction } from "@reduxjs/toolkit";
import { User as UserAuth } from "firebase/auth";

import { SignInCredentials, SignUpCredentials, User } from "./user.types";
import { AdditionalInfo } from "../../utils/firebase/firestore.utils";

export type SetCurrentUser = PayloadAction<User>
export type CheckUserSession = AnyAction
export type GoogleSignInStart = AnyAction
export type EmailSignInStart = PayloadAction<SignInCredentials>
export type SignInSuccess = PayloadAction<User>
export type SignInFailed = PayloadAction<Error>
export type SignUpStart = PayloadAction<SignUpCredentials>
export type SignUpSuccess = PayloadAction<{ user: UserAuth, additionalInfo?: AdditionalInfo }>
export type SignUpFailed = PayloadAction<Error>
export type SignOutStart = AnyAction
export type SignOutSuccess = AnyAction
export type SignOutFailed = PayloadAction<Error>