class Block < ApplicationRecord
  belongs_to :asset
  validates :block_height, :block_hash, uniqueness: true
  validates :block_height, :block_hash, :transaction_num, presence: true
end
