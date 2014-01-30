class OthersController < ApplicationController

	def show
		@other = Others.find(params[:id])
	end
end
