class Job < ActiveRecord::Base
   validates :name, presence: true

   belongs_to :user
   has_many :resumes, dependent: :destroy
end
