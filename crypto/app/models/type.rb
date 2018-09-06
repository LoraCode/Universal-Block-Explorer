class Type < ApplicationRecord
  has_and_belongs_to_many :assets
  validates :name, uniqueness: true
  validates :name, presence: true
end
