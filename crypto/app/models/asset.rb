class Asset < ApplicationRecord
  has_and_belongs_to_many :users
  has_and_belongs_to_many :types
  has_many :blocks, dependent: :nullify
  validates :name, uniqueness: true
  validates :name, presence: true
end
