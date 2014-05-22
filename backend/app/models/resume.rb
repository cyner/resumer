class Resume < ActiveRecord::Base
  has_attached_file :cv
  validates_attachment_content_type :cv, content_type: ['application/pdf', 'application/msword', 'text/plain']
  validate :name, presence: true

  belongs_to :job

  before_create :set_name_from_cv_file_name

  private
  def set_name_from_cv_file_name
    new_name = cv_file_name.chomp(File.extname(cv_file_name)).strip
    new_name = "(unnamed)" unless new_name.present?

    self.name ||= new_name
  end
end
