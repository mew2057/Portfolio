class PortfolioController < ApplicationController
  def index
    @games = Games.all
  end
end
