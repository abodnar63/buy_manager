class Product < ActiveRecord::Base
  belongs_to :user
  has_many :labels
  
  validates :user_id, presence: true
  validates :name, presence: true
end
