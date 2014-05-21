class Api::ResumesController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    render json: @resumes
  end

  def show
    render json: @resume
  end

  def create
    if @resume.save
      render :json => @resume, :status => :created
    else
      render :json => { :errors => @resume.errors.full_messages[0] }, :status => :unprocessable_entity
    end
  end

  def update
    if @resume.update_attributes(update_params)
      render :json => @resume
    else
      render :json => { :errors => @resume.errors.full_messages[0] }, :status => :unprocessable_entity
    end
  end

  def destroy
    @resume.destroy
    render :json => {}
  end

  private
  def create_params
    params.require(:resume).permit(:name, :cv, :github, :cover_letter, :notes, :rating, :job_id)
  end

  def update_params
    params.require(:resume).permit(:name, :cv, :github, :cover_letter, :notes, :rating)
  end
end
