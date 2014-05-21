require 'spec_helper'

describe "Resumes API" do
  context "Without a valid user" do
    context "#index" do
      it "cannot access Resumes API" do
        get "api/resumes.json"

        expect(response).to_not be_success
      end
    end
  end

  context "With a valid user" do
    let(:resume) { FactoryGirl.create(:resume) }
    let(:job) { resume.job }
    let(:resume_not_owned) { FactoryGirl.create(:resume) }
    let(:job_not_owned) { resume_not_owned.job }
    let(:user) { job.user }
    let(:authorization) { authorization_for(user) }

    context "#index" do
      it "has a valid number of resumes" do
        3.times { FactoryGirl.create(:resume, job: job) }

        get "api/resumes.json", nil, authorization
        expect(json['resumes'].count).to eq 4
      end
    end

    context "#show" do
      it 'can get an own resume' do
        get "api/resumes/#{resume.id}.json", nil, authorization

        expect(response).to be_success
        expect(json['resume']['name']).to eq(resume.name)
        expect(json['resume']['cover_letter']).to eq(resume.cover_letter)
      end

      it 'cannot get resume created by another user' do
        get "api/resumes/#{resume_not_owned.id}.json", nil, authorization

        expect(response).to_not be_success
        expect(response.status).to eq 403
      end
    end

    context "#create" do
      it 'creates valid resume' do
        post "api/resumes.json", { resume: FactoryGirl.attributes_for(:resume, job_id: job.id) }, authorization

        expect(response).to be_success
      end

      it "won't create resume for a different job" do
        post "api/resumes.json", { resume: FactoryGirl.attributes_for(:resume, job_id: job_not_owned.id) }, authorization

        expect(response).to_not be_success
        expect(json['error']).to eq "Access Denied"
      end
    end

    context "#update" do
      it "won't update job_id to another users job_id" do
        put "api/resumes/#{resume.id}.json", { resume: FactoryGirl.attributes_for(:resume, job_id: job_not_owned.id) }, authorization
        resume2 = Resume.find(json['resume']['id'])

        expect(resume.job_id).to eq resume2.job_id
      end

      it 'updates name & cover_letter' do
        put "api/resumes/#{resume.id}.json", { resume: FactoryGirl.attributes_for(:resume, name: "New Testing Name", cover_letter: "New Cover Letter") }, authorization
        resume2 = Resume.find(json['resume']['id'])

        expect(resume2.name).to eq "New Testing Name"
        expect(resume2.cover_letter).to eq "New Cover Letter"
      end
    end

    context "#destroy" do
      it 'destroys correctly resume' do
        delete "api/resumes/#{resume.id}.json", nil, authorization

        expect{ resume.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end

      it "won't destroy resume from another user" do
        delete "api/resumes/#{resume_not_owned.id}.json", nil, authorization

        expect{ resume_not_owned.reload }.to be_present
      end
    end
  end
end
