module AuthHelpers
  def authorization_for(user)
    { authorization: "Token token=\"#{user.authentication_token}\", user_email=\"#{user.email}\"" }
  end
end
