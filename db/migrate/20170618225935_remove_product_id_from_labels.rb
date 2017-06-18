class RemoveProductIdFromLabels < ActiveRecord::Migration
  def change
    remove_column :labels, :product_id
  end
end
