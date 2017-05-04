class List < ActiveRecord::Base
  belongs_to :user
  has_many :products

  validates :user_id, presence: true
  validates :name, presence: true
end
