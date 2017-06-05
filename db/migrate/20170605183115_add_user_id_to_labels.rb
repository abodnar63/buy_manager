class AddUserIdToLabels < ActiveRecord::Migration
  def up
    add_column :labels, :user_id, :integer
  end

  def down
    remove_column :labels, :user_id
  end
end
