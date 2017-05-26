class CreateLabelsTable < ActiveRecord::Migration
  def change
    create_table :labels do |t|
      t.string :name
      t.timestamps null: false
      t.integer :product_id
    end
  end
end
