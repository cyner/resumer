class Api::RegistrationsController < ApplicationController
  respond_to :json

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: 201
    else
      render :json => { :errors => @user.errors.full_messages[0] }, :status => :unprocessable_entity
    end
  end

  private
  def user_params
    params.fetch(:user, {}).permit(:email, :password, :password_confirmation)
  end
end
