# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u = User.new(email: 'test@example.com')
u.password = u.password_confirmation = 'example123'
u.save!

['Ruby Developer', 'Manager', 'Javascript Developer', 'CEO'].each do |job_name|
  Job.create(name: job_name, user: u)
end
