class AddRelations < ActiveRecord::Migration
  def change
    add_column :lists, :user_id, :integer
    add_column :products, :user_id, :integer
  end
end
