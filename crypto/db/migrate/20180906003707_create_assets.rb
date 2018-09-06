class CreateAssets < ActiveRecord::Migration[5.2]
  def change
    create_table :assets do |t|
      t.string :name
      t.references :type, foreign_key: true
      t.integer :rank

      t.timestamps
    end
  end
end
