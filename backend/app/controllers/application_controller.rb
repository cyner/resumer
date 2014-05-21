class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :null_session
  before_action :authenticate_user_from_token!

  private
  def authenticate_user_from_token!
    #return sign_in(User.first)
    authenticate_with_http_token do |token, options|
      user_email = options[:user_email].presence
      user       = user_email && User.find_by(email: user_email)

      if user && Devise.secure_compare(user.authentication_token, token)
        sign_in user, store: false
      end
    end
  end

  rescue_from CanCan::AccessDenied, with: :authorization_error
  def authorization_error
    respond_to do |format|
      format.json { render :json => { error: 'Access Denied' }, :status => 403 }
    end
  end
end
