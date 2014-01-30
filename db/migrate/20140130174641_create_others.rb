class CreateOthers < ActiveRecord::Migration
  def change
    create_table :others do |t|
      t.text :Links
      t.text :Name
      t.text :Date
      t.text :Team
      t.text :Type
      t.text :Tools
      t.text :Platform
      t.text :Done
      t.text :Images
      t.text :Description

      t.timestamps
    end
  end
end
