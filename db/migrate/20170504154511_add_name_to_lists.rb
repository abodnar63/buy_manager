class AddNameToLists < ActiveRecord::Migration
  def change
    add_column :lists, :name, :string, default: ""
  end
end
