class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
    	t.string			:name, null: false, unique: true, index: true
    	t.string			:email, null: false, unique: true
    	t.timestamps
    end
  end
end
