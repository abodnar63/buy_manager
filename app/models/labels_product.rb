class LabelsProduct < ActiveRecord::Base
  belongs_to :product, dependent: :destroy
  belongs_to :label, dependent: :destroy

  validates :product_id, presence: true
  validates :label_id, presence: true
end
