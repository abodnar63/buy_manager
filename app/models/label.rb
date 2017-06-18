class Label < ActiveRecord::Base
  belongs_to :user
  has_many :labels_products
  has_many :products, through: :labels_products

  validates :user_id, presence: true
  validates :name, presence: true, uniqueness: true
end
