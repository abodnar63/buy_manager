class CreateLabelsMarks < ActiveRecord::Migration
  def change
    create_table :labels_products do |t|
      t.belongs_to :label, index: true
      t.belongs_to :product, index: true
      t.timestamps
    end
  end
end
