export type TUserCreateForm = {
  email: string
  password: string
  profile_name?: string
}

export type TUserCreate = {
  formData: TUserCreateForm
}

export type OAuth2PasswordRequestForm = {
  grant_type?: string | null
  username: string
  password: string
  scope?: string
  client_id?: string | null
  client_secret?: string | null
}

export type TUserLogin = {
  formData: OAuth2PasswordRequestForm
}

export type TUserPublic = {
  email: string
  profile_name?: string
  disabled?: boolean
}

export type Tusers = {
  users: TUserPublic[]
}

export type TToken = {
  access_token: string
  token_type?: string
}

export type TUserUpdate = {
  profile_name?: string
  disabled?: boolean
}
