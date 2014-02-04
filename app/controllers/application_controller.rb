class ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def image_url(dir)
	URI.join(root_url, image_path(dir))
  end
end

module ApplicationHelper
  def glob_asset_dir(asset_dir)
	assets = String.new
	assets = '['

	Dir.entries("app/assets/images/#{asset_dir.sub('/assets/','')}/").each do |asset|
		if asset =~ /\d+\.png/
			assets += '"' + image_url("#{asset_dir}/#{asset}") + '",'
		end
	end
	assets = assets.chomp(',') + "]"
	return assets
  end
  
  def small_image_url(asset_dir)
	"#{asset_dir}/small.png"
  end
  
  def get_primary_image(asset_dir)
	"#{asset_dir}/00.png"
  end
  
  def construct_asset(dir, file)
	"#{dir}/#{file}"
  end
end
