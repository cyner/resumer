require 'spec_helper'

describe "Jobs API" do
  context "Without a valid user" do
    context "#index" do
      it "cannot access Jobs API" do
        get "api/jobs.json"

        expect(response).to_not be_success
      end
    end
  end

  context "With a valid user" do
    let(:job) { FactoryGirl.create(:job) }
    let(:job_not_owned) { FactoryGirl.create(:job) }
    let(:user) { job.user }
    let(:authorization) { authorization_for(user) }

    context "#index" do
      it "has a valid number of jobs" do
        FactoryGirl.create(:job, user: user)

        get "api/jobs.json", nil, authorization
        expect(json['jobs'].count).to eq 2
      end
    end

    context "#show" do
      it 'can get an own job' do
        get "api/jobs/#{job.id}.json", nil, authorization

        expect(response).to be_success
        expect(json['job']['name']).to eq(job.name)
      end

      it 'cannot get job created by another user' do
        get "api/jobs/#{job_not_owned.id}.json", nil, authorization

        expect(response).to_not be_success
        expect(response.status).to eq 403
      end
    end

    context "#create" do
      it 'creates valid job' do
        post "api/jobs.json", { job: FactoryGirl.attributes_for(:job) }, authorization

        expect(response).to be_success
      end

      it "won't create job without name" do
        post "api/jobs.json", { job: { name: "" } }, authorization

        expect(response).to_not be_success
        expect(json['errors']).to eq "Name can't be blank"
      end

      it "won't create job for different user" do
        post "api/jobs.json", { job: FactoryGirl.attributes_for(:job, user_id: job_not_owned.user_id) }, authorization
        job2 = Job.find(json['job']['id'])

        expect(job2.user_id).to eq user.id
      end
    end

    context "#update" do
      it "won't update user_id" do
        put "api/jobs/#{job.id}.json", { job: FactoryGirl.attributes_for(:job, user_id: job_not_owned.user_id) } , authorization
        job2 = Job.find(json['job']['id'])

        expect(job2.user_id).to eq user.id
      end

      it 'updates name' do
        put "api/jobs/#{job.id}.json", { job: FactoryGirl.attributes_for(:job, name: "New Testing Name") }, authorization
        job2 = Job.find(json['job']['id'])

        expect(job2.name).to eq "New Testing Name"
      end
    end

    context "#destroy" do
      it 'destroys correctly job' do
        delete "api/jobs/#{job.id}.json", nil, authorization

        expect{ job.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it "won't destroy record from another user" do
        delete "api/jobs/#{job_not_owned.id}.json", nil, authorization

        expect{ job_not_owned.reload }.to be_present
      end
    end
  end
end
