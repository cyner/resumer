class ResumeSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes, :cover_letter, :rating, :github, :job_id, :cv_url, :cv_file_name

  def cv_url
    object.cv.url(:original)
  end
end
