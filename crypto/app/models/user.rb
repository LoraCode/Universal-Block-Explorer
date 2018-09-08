class User < ApplicationRecord
  has_and_belongs_to_many :assets
  has_secure_password
end
