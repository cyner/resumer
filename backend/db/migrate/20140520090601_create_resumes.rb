class CreateResumes < ActiveRecord::Migration
  def change
    create_table :resumes do |t|
      t.references :job, index: true

      t.string :name
      t.string :github
      t.text :notes
      t.text :cover_letter

      t.integer :rating, default: 10, null: false

      t.timestamps
    end
  end
end
