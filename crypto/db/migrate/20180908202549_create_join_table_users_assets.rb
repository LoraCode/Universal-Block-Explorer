class CreateJoinTableUsersAssets < ActiveRecord::Migration[5.2]
  def change
    create_join_table :users, :assets do |t|
      # t.index [:user_id, :asset_id]
      # t.index [:asset_id, :user_id]
    end
  end
end
