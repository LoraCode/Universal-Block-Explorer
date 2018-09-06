class CreateBlocks < ActiveRecord::Migration[5.2]
  def change
    create_table :blocks do |t|
      t.integer :block_height
      t.string :block_hash
      t.integer :transaction_num
      t.references :asset, foreign_key: true

      t.timestamps
    end
  end
end
