class AddCvColumnsToResumes < ActiveRecord::Migration
  def change
    add_attachment :resumes, :cv
  end
end
