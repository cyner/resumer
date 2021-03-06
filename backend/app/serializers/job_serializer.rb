class JobSerializer < ActiveModel::Serializer
  embed :ids, include: true

  attributes :id, :name
  has_many :resumes
end
