class PortfolioController < ApplicationController
  def index
    @games = Games.all
	@others = Others.all
  end
end
