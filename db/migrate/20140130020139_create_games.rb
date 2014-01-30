class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :Type
      t.string :Name
      t.string :Date
      t.string :Team
      t.string :Tools
      t.string :Platform
      t.text :Description
      t.text :Done
      t.string :Images

      t.timestamps
    end
  end
end
