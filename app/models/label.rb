class Label < ActiveRecord::Base
  belongs_to :product
  validates :product_id, presence: true
  validates :name, presence: true
end
