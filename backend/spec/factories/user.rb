FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "person#{n}@example.com" }
    password "example123"
    password_confirmation "example123"
  end
end
