class LabelsProduct < ActiveRecord::Base
  belongs_to :product
  belongs_to :label

  validates :product_id, presence: true
  validates :label_id, presence: true
end
