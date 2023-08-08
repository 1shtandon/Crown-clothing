import { UserData, AdditionalInfo } from "../../utils/firebase/firestore.utils"

export type SignInCredentials = {
  email: string
  password: string
}

export type SignUpCredentials = SignInCredentials & { additionalInfo?: AdditionalInfo }

export type User = UserData & { id: string }
