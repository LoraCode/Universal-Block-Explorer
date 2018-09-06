class CreateJoinTableTypesAssets < ActiveRecord::Migration[5.2]
  def change
    create_join_table :types, :assets do |t|
      # t.index [:type_id, :asset_id]
      # t.index [:asset_id, :type_id]
    end
  end
end
