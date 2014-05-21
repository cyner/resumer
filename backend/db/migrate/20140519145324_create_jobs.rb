class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :name
      t.references :user, index: true

      t.timestamps
    end
  end
end
