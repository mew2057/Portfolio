class GamesController < ApplicationController

	def show
		@game = Games.find(params[:id])
	end
end
