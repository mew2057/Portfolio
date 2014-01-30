class GamesController < ApplicationController
	def index
		@games = Games.all
	end
	
	def show
		@game = Games.find(params[:id])
	end
end
