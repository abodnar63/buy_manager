class UpdateListName < ActiveRecord::Migration
  def change
    change_column :lists, :name, :text
  end
end
