# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140130174641) do

  create_table "games", force: true do |t|
    t.text     "Links"
    t.string   "Type"
    t.string   "Name"
    t.string   "Date"
    t.string   "Team"
    t.string   "Tools"
    t.string   "Platform"
    t.text     "Description"
    t.text     "Done"
    t.string   "Images"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

# Could not dump table "other_projects" because of following NoMethodError
#   undefined method `[]' for nil:NilClass

  create_table "others", force: true do |t|
    t.text     "Links"
    t.text     "Name"
    t.text     "Date"
    t.text     "Team"
    t.text     "Type"
    t.text     "Tools"
    t.text     "Platform"
    t.text     "Done"
    t.text     "Images"
    t.text     "Description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
