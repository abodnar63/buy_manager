class Label < ActiveRecord::Base
  belongs_to :user
  belongs_to :product
  validates :user_id, presence: true
  validates :name, presence: true
end
