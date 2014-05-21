class Api::JobsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    render json: @jobs
  end

  def show
    render json: @job
  end

  def create
    if @job.save
      render :json => @job, :status => :created
    else
      render :json => { :errors => @job.errors.full_messages[0] }, :status => :unprocessable_entity
    end
  end

  def update
    if @job.update_attributes(job_params)
      render :json => @job
    else
      render :json => { :errors => @job.errors.full_messages[0] }, :status => :unprocessable_entity
    end
  end

  def destroy
    @job.destroy
    render :json => {}
  end

  private
  def job_params
    params.require(:job).permit(:name)
  end
end
