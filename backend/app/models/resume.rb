class Resume < ActiveRecord::Base
  has_attached_file :cv
  validates_attachment_content_type :cv, content_type: ['application/pdf', 'application/msword', 'text/plain']

  belongs_to :job
end
