import { takeLatest, all, call, put } from "typed-redux-saga/macro"
import { User } from "firebase/auth"

import { 
    checkUserSession,
    googleSignInStart,
    emailSignInStart, 
    signUpStart, 
    signUpSuccess,
    signOutStart,
    signInSuccess,
    signInFailed,
    signUpFailed,
    signOutSuccess,
    signOutFailed
} from "./user.reducer"
import {
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess
} from "./user.action"

import { getCurrentUser, signInWithGooglePopup, signInWithEmailAndPasswordCustom, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils"
import { AdditionalInfo, createUserDocumentFromAuth } from "../../utils/firebase/firestore.utils"

export function* getSnapshotFromUserAuth(userAuth: User, additionalInfo?: AdditionalInfo) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalInfo)
        yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if (!userAuth) return

        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCredentials = yield* call(signInWithEmailAndPasswordCustom, email, password)

        if (userCredentials) {
            const { user } = userCredentials
            yield* call(getSnapshotFromUserAuth, user)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* userSignUp({ payload: { email, password, additionalInfo } }: SignUpStart) {
    try {
        const userCredentials = yield* call(createAuthUserWithEmailAndPassword, email, password)

        if (userCredentials) {
            const { user } = userCredentials
            yield* put(signUpSuccess({user, additionalInfo}))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* signInAfterSignUp({ payload: { user, additionalInfo } }: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, user, additionalInfo)
}

export function* userSignOut() {
    try {
        yield* call(signOutUser)
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(checkUserSession.type, isUserAuthenticated)
}

export function* onGoogleSignIn() {
    yield* takeLatest(googleSignInStart.type, signInWithGoogle)
}

export function* onEmailSignIn() {
    yield* takeLatest(emailSignInStart.type, signInWithEmail)
}

export function* onUserSignUp() {
    yield* takeLatest(signUpStart.type, userSignUp)
}

export function* onSignUpSuccess() {
    yield* takeLatest(signUpSuccess.type, signInAfterSignUp)
}

export function* onUserSignOut() {
    yield* takeLatest(signOutStart.type, userSignOut)
}

export function* userSaga() {
    yield* all([call(onCheckUserSession), call(onGoogleSignIn), call(onEmailSignIn), call(onUserSignUp), call(onSignUpSuccess), call(onUserSignOut)])
}